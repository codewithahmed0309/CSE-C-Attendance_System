export default function AttendanceStats({ total, present, absent, remaining }) {
  const items = [
    { label: 'Total', value: total, color: 'text-text-primary' },
    { label: 'Present', value: present, color: 'text-present' },
    { label: 'Absent', value: absent, color: 'text-absent' },
    { label: 'Remaining', value: remaining, color: 'text-text-secondary' },
  ];

  return (
    <div className="mt-10 grid grid-cols-4 gap-2 border-t border-border pt-6">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <p className={`text-xl font-semibold tabular ${item.color}`}>{item.value}</p>
          <p className="mt-0.5 text-[11px] text-text-secondary">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
