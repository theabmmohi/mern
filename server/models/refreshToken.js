import mongoose from "mongoose"

const refreshTokenSchema = new mongoose.Schema({
  tokenHash: {
    required: true,
    unique: true,
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, ref: "User"
  },
  expiresAt: {
    index: { expires: 0 },
    required: true,
    type: Date
  }
}, { timestamps: true })

export default mongoose.model("RefreshToken", refreshTokenSchema)