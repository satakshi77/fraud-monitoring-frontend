import { useEffect, useState } from "react";
import API from "../services/api";
import { getSocket } from "../services/socket";

export const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.error("Alerts error:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Transactions error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAlerts();
    fetchTransactions();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const onAlert = (data) => {
      setAlerts((prev) => {
        const exists = prev.some(
          (a) => a._id === data._id
        );

        return exists
          ? prev
          : [data, ...prev];
      });
    };

    const onTx = (tx) => {
      setTransactions((prev) => {
        const exists = prev.some(
          (t) => t._id === tx._id
        );

        return exists
          ? prev
          : [tx, ...prev];
      });
    };

    socket.on("new-alert", onAlert);
    socket.on("new-transaction", onTx);

    return () => {
      socket.off("new-alert", onAlert);
      socket.off("new-transaction", onTx);
    };

  }, []);

  return {
    stats,
    alerts,
    transactions,
    fetchStats,
    fetchAlerts,
    fetchTransactions
  };
};