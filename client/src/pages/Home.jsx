import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import TopSearches from "../components/TopSearch.jsx";
import SearchGrid from "../components/SearchGrid.jsx";
import HistoryList from "../components/HistoryList.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [term, setTerm] = useState("");
  const [meta, setMeta] = useState(null);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topSearches, setTopSearches] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchTopSearches();
    fetchHistory();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const res = await api.get("/top-searches");
      if (res.data?.success) setTopSearches(res.data.data || []);
    } catch (err) {
      console.error("top searches fetch failed", err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get("/history");
      if (res.data?.success) setHistory(res.data.data || []);
    } catch (err) {
      console.error("history fetch failed", err);
    }
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    const t = term?.trim();
    if (!t) return;
    setLoading(true);
    try {
      const res = await api.post("/search", { term: t });
      if (res.data?.success) {
        setMeta(res.data.meta || null);
        setResults(res.data.results || []);
        setSelected([]);
        fetchHistory();
        fetchTopSearches();
      } else {
        alert(res.data?.msg || "Search failed");
      }
    } catch (err) {
      console.error("search failed", err);
      alert("Search failed. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-[5%] pt-20 font-inter">
      <motion.header
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-base text-gray-900">
          Welcome back, <span className="font-semibold text-blue-600">{user?.name || "Guest"}</span>
        </p>
      </motion.header>

      <motion.div
        className="bg-white rounded-xl p-5 shadow-sm mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <TopSearches items={topSearches} onPick={(t) => setTerm(t)} />
      </motion.div>

      <main className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_1fr]">
        <motion.section
          className="bg-white rounded-xl p-5 shadow-sm"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm transition focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none"
              placeholder="🔍 Search for images (e.g. sunsets, mountains, cars)"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white rounded-lg px-5 py-3 font-medium cursor-pointer transition hover:bg-blue-800 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {meta && (
            <div className="mt-2 text-sm text-gray-600">
              You searched for <strong>{meta.term}</strong> — {meta.total} results
            </div>
          )}

          <div className="my-2 text-sm text-gray-600">
            Selected: <strong>{selected.length}</strong> images
          </div>

          <SearchGrid results={results} selected={selected} setSelected={setSelected} loading={loading} />
        </motion.section>

        <motion.aside
          className="bg-white rounded-xl p-5 shadow-sm h-fit"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="font-semibold mb-3 text-blue-600">🔁 Your Search History</h3>
          <HistoryList history={history} />
        </motion.aside>
      </main>
    </div>
  );
}
