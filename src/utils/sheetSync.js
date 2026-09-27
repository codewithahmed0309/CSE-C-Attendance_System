import { CLASS_LABEL, GOOGLE_SHEET_WEBAPP_URL } from '../config/constants.js';
import { shortRoll } from './format.js';

// Compact "roll:status,roll:status,..." — kept short so it fits safely in
// a URL query string (GET, not POST — see comment in submitAttendanceToSheet).
function buildRecordsParam(students, statusById) {
  return students
    .map((s) => `${shortRoll(s.fullRoll)}:${statusById[s.id] ?? 'unmarked'}`)
    .join(',');
}

// Asks the Apps Script bridge whether a given date+session has already
// been written to the sheet. Used to show a heads-up on the session
// selector — it does not block anything by itself.
export async function checkSessionRecorded(date, session) {
  if (!GOOGLE_SHEET_WEBAPP_URL) {
    return { known: false, exists: false };
  }

  try {
    const url = new URL(GOOGLE_SHEET_WEBAPP_URL);
    url.searchParams.set('action', 'check');
    url.searchParams.set('class', CLASS_LABEL);
    url.searchParams.set('date', date);
    url.searchParams.set('session', session);

    const res = await fetch(url.toString());
    const data = await res.json();
    return { known: true, exists: !!data.exists };
  } catch {
    // Sheet unreachable / not configured — treat as unknown, not "taken".
    return { known: false, exists: false };
  }
}

// Writes the session's records as one heading block + one row per student.
// The Apps Script refuses the write if this exact date+session heading
// already exists, so a session can only ever be recorded once from here.
// Manual edits directly in the Sheet are unaffected by this check.
export async function submitAttendanceToSheet(students, statusById, date, session) {
  if (!GOOGLE_SHEET_WEBAPP_URL) {
    return { ok: false, reason: 'not-configured' };
  }

  try {
    const url = new URL(GOOGLE_SHEET_WEBAPP_URL);
    url.searchParams.set('action', 'submit');
    url.searchParams.set('class', CLASS_LABEL);
    url.searchParams.set('date', date);
    url.searchParams.set('session', session);
    url.searchParams.set('records', buildRecordsParam(students, statusById));

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.ok) return { ok: true };
    if (data.reason === 'duplicate') return { ok: false, reason: 'duplicate' };
    return { ok: false, reason: 'server-error' };
  } catch {
    return { ok: false, reason: 'network-error' };
  }
}
