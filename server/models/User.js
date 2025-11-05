import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, index: true },
  provider: { type: String },     
  providerId: { type: String, index: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
