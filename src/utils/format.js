// Never display or copy the full institutional roll number in the
// attendance UI — only the last 3 characters.
export function shortRoll(fullRoll) {
  return fullRoll.slice(-3);
}

export function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function buildFullAttendanceText({ students, statusById, date, session, classLabel }) {
  const present = students.filter((s) => statusById[s.id] === 'present');
  const absent = students.filter((s) => statusById[s.id] === 'absent');

  const lines = [
    `${classLabel} Attendance`,
    '',
    `Date: ${date}`,
    `Session: ${session}`,
    '',
    'Present Students:',
    present.map((s) => shortRoll(s.fullRoll)).join(', ') || '-',
    '',
    'Absent Students:',
    absent.map((s) => shortRoll(s.fullRoll)).join(', ') || '-',
    '',
    `Total Strength: ${students.length}`,
    `Present: ${present.length}`,
    `Absent: ${absent.length}`,
  ];

  return lines.join('\n');
}

export function buildRollListText(students, statusById, status) {
  return students
    .filter((s) => statusById[s.id] === status)
    .map((s) => shortRoll(s.fullRoll))
    .join(', ');
}
