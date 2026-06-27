export default function LiveTransactions({
  transactions = []
}) {

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="font-semibold text-lg mb-4">
        Live Transactions
      </h2>

      {!transactions.length ? (
        <p className="text-gray-500">
          No transactions yet
        </p>
      ) : (

        transactions.map(tx => (

          <div
            key={tx._id || tx.id}
            className="flex justify-between border-b py-3"
          >
            <div>
              <p className="font-medium">
                ₹{tx.amount?.toLocaleString()}
              </p>

              <p className="text-sm text-gray-500">
                {tx.transactionType}
              </p>
            </div>

            <span
              className={`text-sm font-semibold ${
                tx.riskScore >= 70
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              Risk {tx.riskScore}
            </span>

          </div>
        ))

      )}
    </div>
  );
}