import { useState } from "react";
import API from "../services/api";

export default function TransactionForm({ onSuccess }) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("transfer");

  const handleSubmit = async (e) => {
    if(e)e.preventDefault();
    try {
      const res = await API.post("/transactions", {
        receiver,
        amount: Number(amount),
        transactionType: type,
      });

      alert("Transaction created");

      setReceiver("");
      setAmount("");

    if (typeof onSuccess==="function") {
          onSuccess();
        }

    } catch (error) {
      console.error("Frontend Form Submission Error Details:", error);
     alert(`Transaction Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-8
      mb-8 text-slate-900
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        text-slate-800
        mb-6
        "
      >
        Create Transaction
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Receiver ID"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="
          w-full
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="
          w-full
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="
          w-full
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        >
          <option value="transfer">
            Transfer
          </option>

          <option value="deposit">
            Deposit
          </option>
        </select>

        <button
          onClick={handleSubmit}
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          font-semibold

          hover:bg-blue-700
          hover:shadow-md

          transition-all
          duration-300
          "
        >
          Send Transaction
        </button>

      </div>
    </div>
  );
}