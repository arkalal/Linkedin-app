import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    provider: String,
    linkedInConnected: { type: Boolean, default: false },
    isOnboarded: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
