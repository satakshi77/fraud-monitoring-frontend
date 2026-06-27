import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../context/AuthContext";
import { getSocket } from "../services/socket";

export default function AlertDesk() {
  const { user, token } = useContext(AuthContext);

  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTxId = (tx) => {
    if (!tx) return "N/A";
    if (typeof tx === 'object') return tx._id || "UNKNOWN";
    return tx;
  };

  useEffect(() => {
    if (!user || !token) return;

    const fetchAlerts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/alerts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const sortedAlerts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAlerts(sortedAlerts);
      } catch (error) {
        console.error("Failed to fetch historical alerts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();

    const socket = getSocket();
    if (!socket) return;

    const handleNewAlert = (newAlert) => {
      setAlerts((prev) => {
        if (prev.some((a) => a._id === newAlert._id)) return prev;
        return [newAlert, ...prev];
      });
    };

    socket.on("new-alert", handleNewAlert);

    return () => {
      socket.off("new-alert", handleNewAlert);
    };
  }, [user, token]);

 const handleResolution = async () => {
  if (!selectedAlert) return;

  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/alerts/${selectedAlert._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }
    );

    setAlerts((prev) => prev.filter((a) => a._id !== selectedAlert._id));
    setSelectedAlert(null);
  } catch (error) {
    console.error("Failed to resolve incident:", error);
    if (error.response?.status === 401) {
      console.error("Session expired or invalid token.");
    }
  }
};
  return (
    <div>
      <div className="max-w-7xl h-full flex flex-col space-y-6">
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-50">Incident Alert Desk</h1>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-mono">Real-Time Threat Triage Pipeline</p>
        </div>

        <div className="flex gap-6 flex-1 min-h-[600px]">
          <div className="w-1/3 flex flex-col gap-3 overflow-y-auto pr-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pending Review ({alerts.length})</h3>

            {isLoading ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center text-sm text-slate-500 font-mono animate-pulse">
                SYNCING DATABASE...
              </div>
            ) : alerts.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-6 text-center text-sm text-slate-500 font-mono">
                QUEUE_CLEAR
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert._id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedAlert?._id === alert._id
                      ? "bg-slate-900 border-slate-900 shadow-md transform scale-[1.02]"
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold font-mono ${selectedAlert?._id === alert._id ? "text-slate-300" : "text-slate-900"}`}>
                      {alert._id ? alert._id.slice(-8).toUpperCase() : "UNKNOWN_ID"}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    alert.riskLabel === 'fraud' ? "bg-rose-100 text-rose-700" : 
                    alert.riskLabel === 'suspicious' ? "bg-amber-100 text-amber-700" : 
                    "bg-emerald-100 text-emerald-700"
                  }`}>
                    {alert.riskLabel}
                  </span>
                  </div>
                  <div className={`text-sm font-medium mb-3 ${selectedAlert?._id === alert._id ? "text-slate-300" : "text-slate-700"}`}>
                    {alert.message}
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold">
    
                    <span className={selectedAlert?._id === alert._id ? "text-slate-400" : "text-slate-500"}>
                      TX: {getTxId(alert.transactionId).slice(-8).toUpperCase()}
                    </span>
                    <span className={selectedAlert?._id === alert._id ? "text-slate-500" : "text-slate-400"}>
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-2/3 bg-white rounded-xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
            {!selectedAlert ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                <div className="text-xs font-mono inline-block bg-slate-100 text-slate-500 px-3 py-1 rounded border border-slate-200 mb-4">
                  AWAITING_SELECTION
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">No Active Incident Selected</h3>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                  <h2 className="text-xl font-bold text-slate-900 font-mono tracking-tight">Alert: {selectedAlert._id.slice(-8).toUpperCase()}</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Linked to Transaction: <span className="font-mono text-slate-700">{getTxId(selectedAlert.transactionId)}</span>
                  </p>
                </div>
                <div className="p-6 flex-1 overflow-y-auto space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Primary ML Trigger</h4>
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg">
                      <p className="text-sm text-rose-900 font-medium">{selectedAlert.message}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
                  <button onClick={handleResolution} className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition-colors shadow-sm">
                    Resolve Incident
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}