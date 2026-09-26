import { useState } from 'react';
import { Sun, Sunset } from 'lucide-react';
import { CLASS_LABEL, SESSIONS } from '../config/constants.js';
import { formatDate } from '../utils/format.js';

export default function SessionSelector({ onStart }) {
  const [selected, setSelected] = useState(null);
  const today = formatDate();

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
          {CLASS_LABEL}
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold text-text-primary">{today}</h1>
        <p className="mt-1 text-sm text-text-secondary">Select a session to begin</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { key: SESSIONS.MORNING, icon: Sun },
            { key: SESSIONS.AFTERNOON, icon: Sunset },
          ].map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              aria-pressed={selected === key}
              className={`flex flex-col items-center gap-2.5 rounded-xl border px-6 py-6 transition-colors ${
                selected === key
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-surface hover:border-border hover:bg-elevated'
              }`}
            >
              <Icon size={20} className={selected === key ? 'text-accent' : 'text-text-secondary'} />
              <span
                className={`text-sm font-medium ${
                  selected === key ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {key}
              </span>
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={() => onStart(selected)}
          className="mt-8 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors enabled:hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Start Attendance
        </button>
      </div>
    </div>
  );
}
