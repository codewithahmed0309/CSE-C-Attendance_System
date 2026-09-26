import { useCallback, useMemo, useState } from 'react';
import { STUDENTS, TOTAL_STUDENTS } from '../data/students.js';

const initialStatusMap = () =>
  STUDENTS.reduce((acc, s) => {
    acc[s.id] = 'unmarked';
    return acc;
  }, {});

export function useAttendance() {
  const [statusById, setStatusById] = useState(initialStatusMap);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [session, setSession] = useState(null); // 'Morning' | 'Afternoon'
  const [started, setStarted] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const total = TOTAL_STUDENTS;

  // Derived counters — always computed from statusById, never
  // incremented/decremented independently, so they can never drift.
  const counters = useMemo(() => {
    let present = 0;
    let absent = 0;
    for (const id in statusById) {
      if (statusById[id] === 'present') present += 1;
      else if (statusById[id] === 'absent') absent += 1;
    }
    const processed = present + absent;
    return {
      total,
      present,
      absent,
      remaining: total - processed,
      processed,
    };
  }, [statusById, total]);

  // "Completed" is derived directly from the counts, not tracked as its
  // own flag — that way it can never fall out of sync with the actual
  // attendance data (e.g. from a stray double state-update).
  const completed = started && counters.processed === total;

  const currentStudent = STUDENTS[currentIndex] ?? null;

  const findNextUnmarkedFrom = useCallback(
    (fromIndex, map) => {
      for (let i = fromIndex + 1; i < total; i++) {
        if (map[STUDENTS[i].id] === 'unmarked') return i;
      }
      // no unmarked ahead — just advance linearly if possible
      return fromIndex + 1 < total ? fromIndex + 1 : fromIndex;
    },
    [total]
  );

  const mark = useCallback(
    (status) => {
      setStatusById((prev) => ({ ...prev, [currentStudent.id]: status }));
      setCurrentIndex((idx) => findNextUnmarkedFrom(idx, { ...statusById, [currentStudent.id]: status }));
    },
    [currentStudent, findNextUnmarkedFrom, statusById]
  );

  const goPrevious = useCallback(() => {
    setCurrentIndex((idx) => Math.max(0, idx - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((idx) => Math.min(total - 1, idx + 1));
  }, [total]);

  const setStatusForStudent = useCallback((studentId, status) => {
    setStatusById((prev) => ({ ...prev, [studentId]: status }));
  }, []);

  const startSession = useCallback((chosenSession) => {
    setSession(chosenSession);
    setStarted(true);
    setCurrentIndex(0);
  }, []);

  const resetAll = useCallback(() => {
    setStatusById(initialStatusMap());
    setCurrentIndex(0);
    setSession(null);
    setStarted(false);
    setReviewOpen(false);
  }, []);

  return {
    students: STUDENTS,
    statusById,
    counters,
    currentIndex,
    currentStudent,
    session,
    started,
    completed,
    reviewOpen,
    setReviewOpen,
    mark,
    goPrevious,
    goNext,
    setStatusForStudent,
    startSession,
    resetAll,
  };
}