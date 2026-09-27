import { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import AttendanceTable from './AttendanceTable.jsx';
import ClipboardActions from './ClipboardActions.jsx';
import { shortRoll } from '../utils/format.js';

const FILTERS = ['All', 'Present', 'Absent', 'Lateral Entry'];

export default function ReviewAttendance({
  students,
  statusById,
  onSetStatus,
  onBack,
  date,
  session,
  onToast,
}) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = students;

    if (filter === 'Present') list = list.filter((s) => statusById[s.id] === 'present');
    else if (filter === 'Absent') list = list.filter((s) => statusById[s.id] === 'absent');
    else if (filter === 'Lateral Entry') list = list.filter((s) => s.studentType === 'lateral');

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || shortRoll(s.fullRoll).toLowerCase().includes(q)
      );
    }

    return list;
  }, [students, statusById, filter, query]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      <h1 className="mt-4 text-lg font-semibold text-text-primary">Review Attendance</h1>
      <p className="mt-1 text-sm text-text-secondary">
        {date} &middot; {session}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-elevated px-3 py-2 sm:w-64">
          <Search size={14} className="text-text-secondary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roll no or name"
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary/60"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <AttendanceTable students={filtered} statusById={statusById} onSetStatus={onSetStatus} />
      </div>

      <div className="mt-8 flex justify-center">
        <ClipboardActions
          students={students}
          statusById={statusById}
          date={date}
          session={session}
          onToast={onToast}
        />
      </div>
    </div>
  );
}
