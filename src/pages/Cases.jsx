import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Cases() {
  const { token } = useContext(AuthContext);
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[selectedLabel, setSelectedLabel] = useState({});
    const statusStyle={  open: "bg-amber-100 text-amber-700",
    investigating: "bg-blue-100 text-blue-700",
    resolved: "bg-emerald-100 text-emerald-700",
    closed: "bg-slate-100 text-slate-600"
    };
    const priorityStyle = {
   low:"bg-green-100 text-green-700",
   medium:"bg-yellow-100 text-yellow-700",
   high:"bg-rose-100 text-rose-700"
};
const navigate = useNavigate();
  const claimCase = async (id) => {
    try {
      const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cases/${id}/claim`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

      setCases((prev) =>
        prev.map((c) => (c._id === id ? res.data : c))
      );

    } catch (err) {
      console.error(err);
    }
  };
const resolveCase = async (id) => {
  try {

    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cases/${id}/status`,
      {
        status: "resolved",
        actualLabel: selectedLabel[id]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setCases(prev =>
      prev.map(c =>
        c._id === id ? res.data : c
      )
    );

  } catch(err){
    console.error(err);
  }
};
useEffect(() => {
  if (!token) return;

  const fetchCases = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cases`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCases(res.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        toast.error("Access denied. Admin only.");

        setTimeout(() => {
          navigate("/dashboard"); 
        }, 1500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchCases();
}, [token]);

  return (
    <div>
      
      <div className="max-w-7xl h-full space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-50">Investigation Cases</h1>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-mono">Deep-dive forensics and resolution</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Case ID</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="p-8 text-center text-slate-400">LOADING_CASES...</td></tr>
              ) : cases.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{c._id?.slice(-8)?.toUpperCase() || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded font-bold text-[10px]  ${priorityStyle[c.priority]}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                  
                    <span className={`px-2 py-1 rounded font-bold text-[10px] ${statusStyle[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{c.analystName || "Unassigned"}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono">{new Date(c.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 space-y-2">

                  {!c.analystId ? (

                    <button
                        onClick={() => claimCase(c._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                    >
                        Claim
                    </button>

                  ) : c.status !== "resolved" ? (

                    <div className="space-y-2">

                        <select
                          value={selectedLabel[c._id] || ""}
                          onChange={(e)=>
                              setSelectedLabel(prev=>({
                                ...prev,
                                [c._id]:e.target.value
                              }))
                          }
                          className="border p-1 rounded text-xs"
                        >
                          <option value="">
                              Select outcome
                          </option>

                          <option value="fraud">
                              Fraud
                          </option>

                          <option value="safe">
                              Safe
                          </option>

                        </select>

                        <button
                          onClick={()=>resolveCase(c._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Resolve
                        </button>

                    </div>

                  ) : (

                    <span className="text-xs text-green-600">
                        Resolved
                    </span>

                  )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}