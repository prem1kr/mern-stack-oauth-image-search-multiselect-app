
export default function SearchGrid({ results = [], selected = [], setSelected, loading = false }) {
  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm">Searching images...</div>;
  }

  if (!results || results.length === 0) {
    return <div className="p-6 text-sm text-gray-500">No results yet</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {results.map((r) => (
        <div key={r.id} className="relative rounded overflow-hidden bg-gray-100">
          <img
            src={r.urls?.small}
            alt={r.alt_description || r.description || "image"}
            className="w-full h-44 object-cover"
          />
          <label className="absolute top-2 left-2 bg-white/90 rounded p-1 flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(r.id)}
              onChange={() => toggle(r.id)}
            />
            <span className="text-xs">Select</span>
          </label>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-xs p-2">
            <div className="truncate">{r.user?.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
