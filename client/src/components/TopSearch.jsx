export default function TopSearches({ items = [], onPick }) {
  return (
    <div className="bg-white p-3 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">Top Searches</h3>
      <div className="flex gap-2 flex-wrap">
        {items.length === 0 && (
          <span className="text-sm text-gray-500">No top searches yet</span>
        )}
        {items.map((it) => (
          <button
            key={it.term}
            onClick={() => onPick(it.term)}
            className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
          >
            {it.term} ({it.count})
          </button>
        ))}
      </div>
    </div>
  );
}
