import CountUpModule from "react-countup";
import { useEffect, useState } from "react";

const CountUp = CountUpModule.default;

export default function KPICards({ stats = {} }) {

  const [activePulse, setActivePulse] = useState({
    Transactions: false,
    "High Risk": false,
    Amount: false,
  });

  const compactAmount = (value) => {
    if (value >= 1e7) return `₹${(value / 1e7).toFixed(1)}Cr`;
    if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)}L`;
    if (value >= 1e3) return `₹${(value / 1e3).toFixed(1)}K`;
    return `₹${value || 0}`;
  };

  const getCardStyle = (title, value) => {
    if (title === "High Risk" && value > 0) {
      return "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-red-500/40";
    }

    if (title === "Alerts" && value > 5) {
      return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-orange-400/40";
    }

    if (title === "Transactions") {
      return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";
    }

    if (title === "Amount") {
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
    }

    return "bg-white text-gray-800";
  };

  const cards = [
    { title: "Transactions", value: stats.totalTransactions || 0 },
    { title: "High Risk", value: stats.highRiskTransactions || 0 },
    { title: "Alerts", value: stats.totalAlerts || 0 },
    { title: "Unread", value: stats.unreadAlerts || 0 },
    { title: "Amount", value: stats.totalAmount || 0 },
  ];

  useEffect(() => {
    const triggerPulse = (key) => {
      setActivePulse((prev) => ({
        ...prev,
        [key]: true,
      }));

      setTimeout(() => {
        setActivePulse((prev) => ({
          ...prev,
          [key]: false,
        }));
      }, 800);
    };

    if (stats.totalTransactions) triggerPulse("Transactions");
    if (stats.highRiskTransactions) triggerPulse("High Risk");
    if (stats.totalAmount) triggerPulse("Amount");

  }, [stats.totalTransactions, stats.highRiskTransactions, stats.totalAmount]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

      {cards.map((c, i) => {
        const style = getCardStyle(c.title, c.value);

        return (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl p-5 shadow-lg transition-all duration-300 hover:scale-[1.03] ${style}`}
          >

        
            <div className="absolute inset-0 opacity-20 bg-white blur-2xl"></div>

            {/* HEADER */}
            <div className="flex items-center justify-between">

              <p className="text-sm font-medium opacity-80">
                {c.title}
              </p>

       
              {(c.title === "Transactions" ||
                c.title === "Amount" ||
                c.title === "High Risk") &&
                activePulse[c.title] && (
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-xs opacity-80">LIVE</span>
                  </div>
              )}

            </div>

 
            <h2 className="text-3xl font-bold mt-3 tracking-tight">
              {c.title === "Amount" ? (
                compactAmount(c.value)
              ) : (
                <CountUp
                  start={0}
                  end={Number(c.value)}
                  duration={1.2}
                  separator=","
                />
              )}
            </h2>

          </div>
        );
      })}
    </div>
  );
}