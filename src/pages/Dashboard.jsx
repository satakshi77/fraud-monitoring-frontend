import Navbar from "../components/Navbar";
import KPICards from "../components/Dashboard/KPICards";
import FraudAlerts from "../components/Dashboard/FraudAlerts";
import LiveTransactions from "../components/Dashboard/LiveTransactions";
import RiskChart from "../components/Dashboard/RiskChart.jsx";
import TrendChart from "../components/Dashboard/TrendChart.jsx";
import TransactionForm from "../components/TransactionForm";
import { useDashboardData } from "../hooks/useDashboardData.js";

export default function Dashboard() {
  const {
    stats,
    alerts,
    transactions,fetchTransactions, fetchStats,fetchAlerts
  } = useDashboardData();

return (
<div className="min-h-screen bg-slate-100">

<Navbar/>

<div className="max-w-7xl mx-auto p-6">


<div className="mb-6">

<KPICards stats={stats}/>

</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-lg mb-4 font-slate-900">
Risk Distribution
</h2>

<RiskChart
transactions={transactions}
/>

</div>


<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-lg mb-4">
Transaction Trends
</h2>

<TrendChart
transactions={transactions}
/>

</div>

</div>


<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


<div className="lg:col-span-2 space-y-6">


<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-lg mb-4">

Fraud Alerts

</h2>

<FraudAlerts
alerts={alerts}
/>

</div>


<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-lg mb-4">

Live Transactions

</h2>

<LiveTransactions
transactions={transactions}
/>

</div>

</div>


<div>

<div className="bg-white rounded-xl shadow p-6 sticky top-6">

<h2 className="font-bold text-lg mb-4">

Create Payment

</h2>

<TransactionForm
onSuccess={()=>{
fetchTransactions();
fetchStats();
fetchAlerts();
}}
/>

</div>

</div>

</div>

</div>

</div>
);

}