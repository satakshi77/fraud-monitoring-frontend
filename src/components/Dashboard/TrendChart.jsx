import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip
} from "recharts";

const TrendChart = ({ transactions }) => {

const grouped = {};

transactions.forEach((tx) => {
  if (!tx?.createdAt) return;

  const date = new Date(tx.createdAt);

  if (isNaN(date.getTime())) return; 

  const key = date.toISOString().split("T")[0];

  grouped[key] = (grouped[key] || 0) + 1;
});

const data =
Object.keys(grouped).map(
date=>({
date,
count:grouped[date]
})
);

return(

<LineChart
width={500}
height={300}
data={data}
>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line dataKey="count"/>

</LineChart>

);

};

export default TrendChart;