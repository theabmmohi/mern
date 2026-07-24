import express from "express"
const router = express.Router()

import { signAccessToken, generateRefreshToken, hashToken } from "../utils/token.js"
import RefreshToken from "../models/RefreshToken.js"
import createRes from "../utils/createRes.js"
import User from "../models/User.js"

const isProd = process.env.NODE_ENV === "prod"
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true, secure: isProd,
  sameSite: isProd ? "strict" : "lax",
  ...(isProd && process.env.APP_DOMAIN ? { domain: process.env.APP_DOMAIN } : {})
}

router.post("/register", async (req, res) => {
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
    await RefreshToken.create({ tokenHash: hashToken(refreshToken), userId: user._id, expiresAt })
    res.cookie("refreshToken", refreshToken, { ...REFRESH_COOKIE_OPTIONS, expires: expiresAt })
    res.json(createRes(true, "User registered.", { accessToken, user: { id: user._id, username: user.username, email: user.email } }))
  } catch (error) {res.json(createRes(false, error?.message ?? "Server error."))}
})

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body
    if (!identifier) return res.json(createRes(false, "Username or email required."))
    if (!password) return res.json(createRes(false, "Password required."))
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select("+password")
    if (!user || !(await user.comparePassword(password))) return res.json(createRes(false, "Invalid credentials."))
    const accessToken = signAccessToken(user._id)
    const { raw: refreshToken, expiresAt } = generateRefreshToken()
    await RefreshToken.create({ tokenHash: hashToken(refreshToken), userId: user._id, expiresAt })
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
    await existing.deleteOne()
    const accessToken = signAccessToken(existing.userId)
    const { raw: newRefreshToken, expiresAt } = generateRefreshToken()
    await RefreshToken.create({ tokenHash: hashToken(newRefreshToken), userId: existing.userId, expiresAt })
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