import React, { useState } from "react";
import SearchGrid from "../components/SearchGrid.jsx";
import api from "../api/api.js";

export default function Search() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [meta, setMeta] = useState(null);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

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
      } else {
        alert(res.data?.msg || "Search failed");
      }
    } catch (err) {
      console.error(err);
      alert("Search failed. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Search images..."
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Search
          </button>
        </form>

        {meta && <div className="mb-3 text-sm text-gray-700">You searched for <strong>{meta.term}</strong> — {meta.total} results</div>}

        <div className="mb-3">Selected: <strong>{selected.length}</strong> images</div>

        <SearchGrid results={results} selected={selected} setSelected={setSelected} loading={loading} />
      </div>
    </div>
  );
}
