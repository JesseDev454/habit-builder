import { heatmapData } from "../../data/mockData";

const shades = ["bg-surface-container-highest", "bg-primary/20", "bg-primary/40", "bg-primary/70", "bg-primary"];

const getShade = (count = 0) => shades[Math.min(count, shades.length - 1)];

const Heatmap = ({ data = heatmapData, title = "Calendar heatmap" }) => (
  <div>
    {title ? <h3 className="mb-3 font-display text-lg font-extrabold text-text-primary">{title}</h3> : null}
    <div className="grid grid-cols-7 gap-2">
      {data.map((day, index) => (
        <div
          key={day.date || day.id || index}
          className={`aspect-square rounded-md ${getShade(day.count)} ring-1 ring-white`}
          title={`${day.date || "Day"}: ${day.count || 0} completions`}
        />
      ))}
    </div>
  </div>
);

export default Heatmap;
