import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import HistoryList from "../components/HistoryList.jsx";
import { motion } from "framer-motion";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/history");
      if (res.data?.success) setHistory(res.data.data || []);
    } catch (err) {
      console.error("failed history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-full mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
          Your Search History
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 text-base font-medium animate-pulse">
            Loading...
          </div>
        ) : history.length > 0 ? (
          <HistoryList history={history} />
        ) : (
          <p className="text-center text-gray-400 text-base">No search history found.</p>
        )}
      </div>
    </motion.div>
  );
}
