import StatusChip from "./StatusChip";

const AdminTable = ({ rows }) => (
  <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
    <table className="w-full min-w-[620px] text-left text-sm">
      <thead className="bg-[#f6f2fe] text-xs uppercase tracking-wide text-[var(--color-secondary)]">
        <tr>
          <th className="px-5 py-4">Name</th>
          <th className="px-5 py-4">Type</th>
          <th className="px-5 py-4">Status</th>
          <th className="px-5 py-4">Activity</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[var(--color-border)]">
        {rows.map((row) => (
          <tr key={row.id}>
            <td className="px-5 py-4 font-bold">{row.name}</td>
            <td className="px-5 py-4 text-[var(--color-secondary)]">{row.type}</td>
            <td className="px-5 py-4"><StatusChip status={row.status} /></td>
            <td className="px-5 py-4 text-[var(--color-secondary)]">{row.activity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminTable;
