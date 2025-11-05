
export default function HistoryList({ history = [] }) {
  if (!history || history.length === 0)
    return <div className="text-sm text-gray-500">No searches yet</div>;

  return (
    <ul className="space-y-3 text-sm">
      {history.map((h) => (
        <li key={h._id} className="p-2 bg-white rounded shadow-sm">
          <div className="font-medium">{h.term}</div>
          <div className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}
