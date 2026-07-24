import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  username: {
    type: String, required: true, unique: true,
    lowercase: true, trim: true,
    minlength: 3, maxlength: 25,
    match: [/^[a-z0-9]+$/, "Username can only contain lowercase letters and numbers"]
  },
  email: {
    type: String, required: true, unique: true,
    lowercase: true, trim: true
  },
  password: {
    required: true,
    select: false,
    type: String
  }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model("User", userSchema)