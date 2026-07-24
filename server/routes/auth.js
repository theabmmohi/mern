import rateLimit, { ipKeyGenerator } from "express-rate-limit"
import express from "express"
const router = express.Router()

import { signAccessToken, generateRefreshToken, hashToken } from "#util/tokens"
import RefreshToken from "#model/refreshToken"
import createRes from "#util/createRes"
import User from "#model/user"

const loginIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 20,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  message: createRes(false, "Too many attempts, try again later.")
})
const loginIdLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  keyGenerator: (req) => req.body?.identifier ?? "unknown",
  message: createRes(false, "Too many attempts, try again later.")
})
const registerIpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 10,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  message: createRes(false, "Too many attempts, try again later.")
})
const registerIdLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 5,
  keyGenerator: (req) => req.body?.email ?? "unknown",
  message: createRes(false, "Too many attempts, try again later.")
})

const isProd = process.env.NODE_ENV === "prod"
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true, secure: isProd,
  sameSite: isProd ? "strict" : "lax",
  ...(isProd && process.env.APP_DOMAIN ? { domain: process.env.APP_DOMAIN } : {})
}

router.post("/register", registerIpLimiter, registerIdLimiter, async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username) return res.json(createRes(false, "Username required."))
    if (!password) return res.json(createRes(false, "Password required."))
    if (!email) return res.json(createRes(false, "Email required."))
    const [usernameTaken, emailTaken] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email })
    ])
    if (usernameTaken) return res.json(createRes(false, "Username unavailable."))
    if (emailTaken) return res.json(createRes(false, "Email unavailable."))
    const user = await User.create({ username, email, password })
    const accessToken = signAccessToken(user._id)
    const { raw: refreshToken, expiresAt } = generateRefreshToken()
    await RefreshToken.create({
      tokenHash: hashToken(refreshToken),
      userId: user._id, expiresAt,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip
    })
    res.cookie("refreshToken", refreshToken, { ...REFRESH_COOKIE_OPTIONS, expires: expiresAt })
    res.json(createRes(true, "User registered.", { accessToken, user: { id: user._id, username: user.username, email: user.email } }))
  } catch (error) {res.json(createRes(false, error?.message ?? "Server error."))}
})
router.post("/login", loginIpLimiter, loginIdLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body
    if (!identifier) return res.json(createRes(false, "Username or email required."))
    if (!password) return res.json(createRes(false, "Password required."))
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select("+password")
    if (!user || !(await user.comparePassword(password))) return res.json(createRes(false, "Invalid credentials."))
    const accessToken = signAccessToken(user._id)
    const { raw: refreshToken, expiresAt } = generateRefreshToken()
    await RefreshToken.create({
      tokenHash: hashToken(refreshToken),
      userId: user._id, expiresAt,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip
    })
    res.cookie("refreshToken", refreshToken, { ...REFRESH_COOKIE_OPTIONS, expires: expiresAt })
    res.json(createRes(true, "Logged in.", { accessToken, user: { id: user._id, username: user.username, email: user.email } }))
  } catch (error) {res.json(createRes(false, error?.message ?? "Server error."))}
})
router.post("/refresh", async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken
    if (!incomingRefreshToken) return res.json(createRes(false, "Not logged in."))
    const tokenHash = hashToken(incomingRefreshToken)
    const existing = await RefreshToken.findOne({ tokenHash })
    if (!existing || existing.expiresAt < new Date()) {
      res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS)
      return res.json(createRes(false, "Session expired."))
    }
    if (existing.used) {
      await RefreshToken.deleteMany({ userId: existing.userId })
      res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS)
      return res.json(createRes(false, "Security alert: all sessions revoked. Please log in again."))
    }
    existing.used = true
    await existing.save()
    const accessToken = signAccessToken(existing.userId)
    const { raw: newRefreshToken, expiresAt } = generateRefreshToken()
    await RefreshToken.create({
      tokenHash: hashToken(newRefreshToken),
      userId: existing.userId, expiresAt,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip
    })
    res.cookie("refreshToken", newRefreshToken, { ...REFRESH_COOKIE_OPTIONS, expires: expiresAt })
    res.json(createRes(true, "Token refreshed.", { accessToken }))
  } catch (error) {res.json(createRes(false, error?.message ?? "Server error."))}
})
router.post("/logout", async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken
    if (incomingRefreshToken) await RefreshToken.deleteOne({ tokenHash: hashToken(incomingRefreshToken) })
    res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS)
    res.json(createRes(true, "Logged out."))
  } catch (error) {res.json(createRes(false, error?.message ?? "Server error."))}
})

export default router