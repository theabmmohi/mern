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
    type: String, required: true, select: false,
    validate: {
      validator: (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v),
      message: "Password must be at least 8 characters and include uppercase, lowercase, and number.",
    }
  }
}, { timestamps: true })

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model("User", userSchema)