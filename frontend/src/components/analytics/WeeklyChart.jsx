import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const WeeklyChart = ({ data = [] }) => (
  <div className="h-64 w-full">
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: "#EEEAFE" }} />
        <Bar dataKey="completions" fill="#6C5CE7" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default WeeklyChart;
