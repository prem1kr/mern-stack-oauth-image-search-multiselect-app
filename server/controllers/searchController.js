import Search from "../models/Search.js";
import { searchPhotos } from "../config/unsplash.js";


export const handleSearch = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, msg: "Unauthorized" });

    const { term } = req.body;
    if (!term || term.trim().length === 0) {
      return res.status(400).json({ success: false, msg: "Term is required" });
    }

    const normalized = term.trim();
    await Search.create({ userId, term: normalized });

    const unsplashRes = await searchPhotos(normalized, { per_page: 40, page: 1 });

    return res.json({
      success: true,
      meta: {
        total: unsplashRes.total,
        total_pages: unsplashRes.total_pages,
        term: normalized,
      },
      results: unsplashRes.results,
    });
  } catch (err) {
    console.error("❌ handleSearch error:", err);
    res.status(500).json({ success: false, msg: "Failed to search images" });
  }
};


export const getTopSearches = async (req, res) => {
  try {
    const top = await Search.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { term: "$_id", count: 1, _id: 0 } },
    ]);

    res.json({ success: true, data: top });
  } catch (err) {
    console.error("❌ getTopSearches error:", err);
    res.status(500).json({ success: false, msg: "Failed to fetch top searches" });
  }
};
