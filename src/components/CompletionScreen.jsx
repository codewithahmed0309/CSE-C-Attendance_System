import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, UploadCloud } from 'lucide-react';
import { CLASS_LABEL } from '../config/constants.js';
import ClipboardActions from './ClipboardActions.jsx';
import { submitAttendanceToSheet } from '../utils/sheetSync.js';

export default function CompletionScreen({
  students,
  statusById,
  counters,
  date,
  session,
  onReview,
  onNewAttendance,
  onToast,
}) {
  const [syncing, setSyncing] = useState(false);

  async function handleSync() {
    setSyncing(true);
    const result = await submitAttendanceToSheet(students, statusById, date, session);
    setSyncing(false);

    if (result.ok) {
      onToast('Synced to Google Sheet');
    } else if (result.reason === 'not-configured') {
      onToast('Google Sheet not connected yet');
    } else if (result.reason === 'duplicate') {
      onToast(`${session} attendance was already recorded`);
    } else {
      onToast('Could not reach Google Sheet');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center sm:py-24"
    >
      <CheckCircle2 size={30} className="text-present" />
      <h1 className="mt-4 text-xl font-semibold text-text-primary">Attendance Completed</h1>

      <p className="mt-2 text-sm text-text-secondary">
        {CLASS_LABEL} &middot; {date} &middot; {session}
      </p>

      <div className="mt-8 grid w-full grid-cols-3 gap-2 border-y border-border py-6">
        <div>
          <p className="text-xl font-semibold tabular text-text-primary">{counters.total}</p>
          <p className="mt-0.5 text-[11px] text-text-secondary">Total</p>
        </div>
        <div>
          <p className="text-xl font-semibold tabular text-present">{counters.present}</p>
          <p className="mt-0.5 text-[11px] text-text-secondary">Present</p>
        </div>
        <div>
          <p className="text-xl font-semibold tabular text-absent">{counters.absent}</p>
          <p className="mt-0.5 text-[11px] text-text-secondary">Absent</p>
        </div>
      </div>

      <div className="mt-8 w-full space-y-3">
        <button
          onClick={onReview}
          className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          Review Attendance
        </button>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-60"
        >
          {syncing ? <Loader2 size={15} className="animate-spin" /> : <UploadCloud size={15} />}
          {syncing ? 'Syncing…' : 'Sync to Google Sheet'}
        </button>

        <ClipboardActions
          students={students}
          statusById={statusById}
          date={date}
          session={session}
          onToast={onToast}
          layout="grid"
        />

        <button
          onClick={onNewAttendance}
          className="w-full rounded-lg border border-border py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          Start New Attendance
        </button>
      </div>
    </motion.div>
  );
}
