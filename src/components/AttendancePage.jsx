import { useEffect } from 'react';
import StudentAttendanceCard from './StudentAttendanceCard.jsx';
import AttendanceActions from './AttendanceActions.jsx';
import ProgressIndicator from './ProgressIndicator.jsx';
import AttendanceStats from './AttendanceStats.jsx';

export default function AttendancePage({ attendance }) {
  const { students, currentStudent, currentIndex, counters, mark, goPrevious } = attendance;

  useEffect(() => {
    function handleKey(e) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'p' || e.key === 'P') mark('present');
      else if (e.key === 'a' || e.key === 'A') mark('absent');
      else if (e.key === 'ArrowLeft') goPrevious();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mark, goPrevious]);

  if (!currentStudent) return null;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-14 sm:py-20">
      <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Attendance</p>

      <div className="mt-6 w-full">
        <StudentAttendanceCard student={currentStudent} index={currentIndex} total={students.length} />
      </div>

      <AttendanceActions
        onPresent={() => mark('present')}
        onAbsent={() => mark('absent')}
        onPrevious={goPrevious}
        canGoPrevious={currentIndex > 0}
      />

      <ProgressIndicator processed={counters.processed} total={counters.total} />

      <div className="w-full">
        <AttendanceStats {...counters} />
      </div>
    </div>
  );
}