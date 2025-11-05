import Search from "../models/Search.js";


export const getHistory = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, msg: "Unauthorized" });

    const history = await Search.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: history });
  } catch (err) {
    console.error("❌ getHistory error:", err);
    res.status(500).json({ success: false, msg: "Failed to fetch history" });
  }
};
