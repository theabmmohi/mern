import jwt from "jsonwebtoken"
import crypto from "crypto"

const ACCESS_EXPIRY = "15m"
const REFRESH_EXPIRY_DAYS = 30

export function signAccessToken(userId) {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_EXPIRY,
    algorithm: "HS256"
  })
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithm: "HS256" })
}

export function generateRefreshToken() {
  const raw = crypto.randomBytes(40).toString("hex")
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
  return { raw, expiresAt }
}

export function hashToken(raw) {
  return crypto.createHash("sha256").update(raw).digest("hex")
}