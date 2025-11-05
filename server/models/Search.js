import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  term: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Search", SearchSchema);
