import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client"; 
import axios from "axios"; 
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../context/AuthContext"; 

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

export default function LiveMonitor() {
  const [isConnected, setIsConnected] = useState(false);
  const { globalStream, setGlobalStream, user, token } = useContext(AuthContext); 

  useEffect(() => {
    if (!user || !token) return; 

    const fetchHistory = async () => {
      try {
       const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const history = res.data.map(tx => ({
          id: tx._id, 
          amount: tx.amount,
          risk: tx.riskScore,
          time: new Date(tx.createdAt).toLocaleTimeString(),
          status: tx.status.toUpperCase()
        }));

        setGlobalStream(history.reverse().slice(0, 15)); 
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();

    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"] 
    });

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join-room", user._id); 
    });

    socket.on("disconnect", () => setIsConnected(false));

    socket.on("new-transaction", (realTxData) => {
      const formattedTx = {
        id: realTxData._id, 
        amount: realTxData.amount,
        risk: realTxData.riskScore,
        time: new Date(realTxData.timestamp).toLocaleTimeString(),
        status: realTxData.status.toUpperCase()
      };

      setGlobalStream((prev) => [formattedTx, ...prev].slice(0, 15)); 
    });
    
    return () => {
      socket.off("new-transaction");
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [user, token, setGlobalStream]);

  return (
      <div>
        <div className="space-y-6 max-w-7xl">
          <div className="flex justify-between items-end border-b border-slate-200 pb-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-50">Live Stream Monitor</h1>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-mono">Ingestion Gateway: ACTIVE</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full animate-pulse ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className={`text-xs font-mono font-semibold ${isConnected ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isConnected ? "LIVE STREAM CONNECTED" : "CONNECTION LOST"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Tx ID</th>
                  <th className="px-6 py-4 font-medium">Timestamp</th>
                  <th className="px-6 py-4 font-medium">Principal Amount</th>
                  <th className="px-6 py-4 font-medium">Risk Score</th>
                  <th className="px-6 py-4 font-medium">Status Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {globalStream.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-400 font-mono text-xs">
                      AWAITING INCOMING TRANSACTION STREAM...
                    </td>
                  </tr>
                ) : (
                  globalStream.map((tx, idx) => (
                    <tr key={tx.id || idx} className={`hover:bg-slate-50 transition-colors ${idx === 0 ? 'bg-emerald-50/30' : ''}`}>
                      <td className="px-6 py-4 font-mono text-slate-900 font-medium">{tx.id}</td>
                      <td className="px-6 py-4">{tx.time}</td>
                      <td className="px-6 py-4 font-mono">₹{tx.amount?.toLocaleString()}</td>
                      <td className="px-6 py-4 font-mono font-semibold">
                        <span className={tx.risk >= 70 ? "text-rose-600" : "text-emerald-600"}>{tx.risk}%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded ${tx.status === 'FLAGGED' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
  );
}