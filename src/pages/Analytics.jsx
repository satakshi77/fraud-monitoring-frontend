import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function Analytics() {
  const { token } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/analytics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  if (isLoading) return <div className="p-6">Loading analytics...</div>;
  if (!analytics) return <div className="p-6">No data available</div>;

  const summary = analytics?.summary || {};
  const ml = analytics?.mlEvaluation || {};
  const insights = analytics?.mlInsights || {};
  const dist = analytics?.distribution || {};

  const riskData = [
    { name: "Low", value: dist.lowRisk || 0 },
    { name: "Medium", value: dist.mediumRisk || 0 },
    { name: "High", value: dist.highRisk || 0 },
  ];

  const getRiskColor = (trend) => {
    if (trend === "rising_risk") return "text-red-500";
    if (trend === "low_risk") return "text-green-500";
    return "text-yellow-500";
  };

  const getRiskLabel = (trend) => {
    if (trend === "rising_risk") return "⚠ High Risk Activity Detected";
    if (trend === "low_risk") return "System Stable";
    return "Normal Activity";
  };

  return (
    <div className="p-6 space-y-6">


      <div>
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className={`font-medium ${getRiskColor(insights.riskTrend)}`}>
          {getRiskLabel(insights.riskTrend)}
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="p-4 bg-white shadow rounded">
          <h2>Total Transactions</h2>
          <p className="text-xl font-bold">{summary.totalTransactions}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2>Total Volume</h2>
          <p className="text-xl font-bold">₹{summary.totalAmount}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2>Avg Risk Score</h2>
          <p className="text-xl font-bold">{summary.avgRiskScore}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2>Fraud Ratio</h2>
          <p className="text-xl font-bold text-red-500">
            {summary.fraudRatio}%
          </p>
        </div>

      </div>


      <div className="p-4 bg-gray-50 border rounded">
        <h2 className="font-semibold">ML Insight</h2>
        <p className="text-sm text-gray-700 mt-1">
          {insights.interpretation}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">Precision</h2>
          <p className="text-xl font-bold text-indigo-600">
            {ml.precision}%
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">Recall</h2>
          <p className="text-xl font-bold text-purple-600">
            {ml.recall}%
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">F1 Score</h2>
          <p className="text-xl font-bold text-green-600">
            {ml.f1Score}%
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">False Positive Rate</h2>
          <p className="text-xl font-bold text-red-500">
            {ml.falsePositiveRate}%
          </p>
        </div>

      </div>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-semibold mb-4">Risk Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value">
              {riskData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}