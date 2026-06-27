export default function FraudAlerts({ alerts }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Fraud Alerts</h2>

      {alerts.length === 0 && (
        <p className="text-gray-400">No alerts</p>
      )}

      {alerts.map((a) => (
        <div key={a._id} className="border-b py-2">
          <p className="text-sm font-medium">{a.message}</p>
          <p className="text-xs text-gray-500">
            {new Date(a.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}