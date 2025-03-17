import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "<5", value: 15 },
  { name: "5-9", value: 20 },
  { name: "10-14", value: 19 },
  { name: "15-19", value: 22 },
  { name: "20-24", value: 21 },
  { name: "25-29", value: 29 },
  { name: "30-34", value: 23 },
  { name: "35-39", value: 18 },
  { name: "40-44", value: 23 },
  { name: "45-49", value: 19 },
  { name: "50-54", value: 16 },
  { name: "55-59", value: 19 },
  { name: "60-64", value: 28 },
  { name: "65-69", value: 17 },
  { name: "70-74", value: 20 },
  { name: "75-79", value: 16 },
  { name: "80-84", value: 18 },
  { name: "≥85", value: 21 },
];

const COLORS = [
  "#6ccad0", "#5ab0c4", "#48a2b8", "#36a4a4", "#24b690",
  "#29c768", "#3bd95e", "#5ae858", "#78f055", "#95f758",
  "#b2fc5d", "#d0fe65", "#edf070", "#f5c56b", "#f29264",
  "#e66a5d", "#d44557", "#c02050"
];

const PostViewChart = () => {
  return (
    <ResponsiveContainer  width="100%" height={300}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={140}
          fill="#8884d8"
          paddingAngle={3}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PostViewChart;
