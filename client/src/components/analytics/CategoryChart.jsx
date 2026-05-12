import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { categoryBreakdown } from "../../data/mockData";

const colors = ["#6C5CE7", "#FBBF24", "#22C55E", "#38BDF8", "#EC4899"];

const CategoryChart = ({ data = categoryBreakdown }) => (
  <div className="h-64">
    <ResponsiveContainer>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={90} paddingAngle={4}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default CategoryChart;
