import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    password: {
      type: String
    },
    role: {
      type: String
    }
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', UserSchema)

export default userModel
