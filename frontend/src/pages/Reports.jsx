import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 70 },
  { day: "Wed", score: 75 },
  { day: "Thu", score: 72 },
  { day: "Fri", score: 80 },
  { day: "Sat", score: 78 },
  { day: "Sun", score: 85 },
];

const pieData = [
  { name: "Carbon", value: 30 },
  { name: "Water", value: 20 },
  { name: "Energy", value: 25 },
  { name: "Waste", value: 15 },
  { name: "Lifestyle", value: 10 },
];

function Reports() {
  return (
    <div>
      <h2>Weekly Sustainability Trend</h2>

      <LineChart width={600} height={300} data={weeklyData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#2E7D32" />
      </LineChart>

      <h2>Impact Breakdown</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#2E7D32"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill="#2E7D32" />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default Reports;
