import { Copy } from 'lucide-react';
import { buildFullAttendanceText, buildRollListText } from '../utils/format.js';

async function copyText(text, onDone) {
  try {
    await navigator.clipboard.writeText(text);
    onDone(true);
  } catch {
    onDone(false);
  }
}

export default function ClipboardActions({ students, statusById, date, session, onToast, layout = 'row' }) {
  function handleCopyPresent() {
    const text = buildRollListText(students, statusById, 'present', date, session);
    copyText(text, (ok) =>
      onToast(ok ? 'Present roll numbers copied' : 'Clipboard unavailable')
    );
  }

  function handleCopyAbsent() {
    const text = buildRollListText(students, statusById, 'absent', date, session);
    copyText(text, (ok) => onToast(ok ? 'Absent roll numbers copied' : 'Clipboard unavailable'));
  }

  function handleCopyFull() {
    const text = buildFullAttendanceText({
      students,
      statusById,
      date,
      session,
    });
    copyText(text, (ok) => onToast(ok ? 'Full attendance copied' : 'Clipboard unavailable'));
  }

  const btnClass =
    'flex items-center justify-center gap-2 rounded-lg border border-border bg-elevated px-4 py-2.5 text-xs font-medium text-text-primary transition-colors hover:border-accent/40 hover:text-accent';

  return (
    <div className={layout === 'row' ? 'flex flex-wrap justify-center gap-2.5' : 'grid gap-2.5'}>
      <button onClick={handleCopyPresent} className={btnClass}>
        <Copy size={13} />
        Copy Present
      </button>
      <button onClick={handleCopyAbsent} className={btnClass}>
        <Copy size={13} />
        Copy Absent
      </button>
      <button onClick={handleCopyFull} className={btnClass}>
        <Copy size={13} />
        Copy Full Attendance
      </button>
    </div>
  );
}
