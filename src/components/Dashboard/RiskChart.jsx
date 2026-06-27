import { PieChart, Pie, Tooltip,Cell,Legend } from "recharts";
const COLORS = ["#2ecc71", "#e74c3c","#808080"];
const RiskChart = ({ transactions }) => {

  const data = [
    {
      name: "Safe",
      value: transactions.filter(
        t => t.riskScore < 50
      ).length
    },
    {
      name: "Suspicious",
      value: transactions.filter(
        t => t.riskScore >= 50 &&
        t.riskScore < 80
      ).length
    },
    {
      name: "Fraud",
      value: transactions.filter(
        t => t.riskScore >= 80
      ).length
    }
  ];

return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default RiskChart;