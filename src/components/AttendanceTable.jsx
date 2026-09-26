import { shortRoll } from '../utils/format.js';

const statusStyles = {
  present: 'text-present',
  absent: 'text-absent',
  unmarked: 'text-text-secondary',
};

export default function AttendanceTable({ students, statusById, onSetStatus }) {
  if (students.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">No matching students.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-elevated text-left text-xs text-text-secondary">
            <th className="px-4 py-2.5 font-medium">Roll No</th>
            <th className="px-4 py-2.5 font-medium">Name</th>
            <th className="px-4 py-2.5 font-medium">Status</th>
            <th className="px-4 py-2.5 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => {
            const status = statusById[s.id];
            return (
              <tr key={s.id} className="border-b border-border/60 last:border-none">
                <td className="px-4 py-2.5 font-mono text-text-primary">{shortRoll(s.fullRoll)}</td>
                <td className="px-4 py-2.5 text-text-primary">{s.name}</td>
                <td className={`px-4 py-2.5 font-medium capitalize ${statusStyles[status]}`}>
                  {status}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onSetStatus(s.id, 'present')}
                      aria-label={`Mark ${s.name} present`}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                        status === 'present'
                          ? 'border-present/50 bg-present/10 text-present'
                          : 'border-border text-text-secondary hover:text-present'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => onSetStatus(s.id, 'absent')}
                      aria-label={`Mark ${s.name} absent`}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                        status === 'absent'
                          ? 'border-absent/50 bg-absent/10 text-absent'
                          : 'border-border text-text-secondary hover:text-absent'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
