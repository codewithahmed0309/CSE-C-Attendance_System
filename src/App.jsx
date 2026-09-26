import { useCallback, useMemo, useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import AppShell from './components/AppShell.jsx';
import SessionSelector from './components/SessionSelector.jsx';
import AttendancePage from './components/AttendancePage.jsx';
import CompletionScreen from './components/CompletionScreen.jsx';
import ReviewAttendance from './components/ReviewAttendance.jsx';
import ConfirmationModal from './components/ConfirmationModal.jsx';
import Toast from './components/Toast.jsx';
import { useAttendance } from './hooks/useAttendance.js';
import { formatDate } from './utils/format.js';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const attendance = useAttendance();
  const date = useMemo(() => formatDate(), []);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2200);
  }, []);

  function handleLogout() {
    attendance.resetAll();
    setAuthenticated(false);
  }

  function handleConfirmReset() {
    attendance.resetAll();
    setResetModalOpen(false);
  }

  if (!authenticated) {
    return <LoginPage onSuccess={() => setAuthenticated(true)} />;
  }

  if (!attendance.started) {
    return (
      <AppShell session={null} date={date} onLogout={handleLogout}>
        <SessionSelector onStart={attendance.startSession} />
      </AppShell>
    );
  }

  return (
    <AppShell session={attendance.session} date={date} onLogout={handleLogout}>
      {attendance.reviewOpen ? (
        <ReviewAttendance
          students={attendance.students}
          statusById={attendance.statusById}
          onSetStatus={attendance.setStatusForStudent}
          onBack={() => attendance.setReviewOpen(false)}
          date={date}
          session={attendance.session}
          onToast={showToast}
        />
      ) : attendance.completed ? (
        <CompletionScreen
          students={attendance.students}
          statusById={attendance.statusById}
          counters={attendance.counters}
          date={date}
          session={attendance.session}
          onReview={() => attendance.setReviewOpen(true)}
          onNewAttendance={() => setResetModalOpen(true)}
          onToast={showToast}
        />
      ) : (
        <AttendancePage attendance={attendance} />
      )}

      <ConfirmationModal
        open={resetModalOpen}
        title="Start a new attendance session?"
        description="Your current attendance session will be cleared."
        confirmLabel="Start New Attendance"
        onConfirm={handleConfirmReset}
        onCancel={() => setResetModalOpen(false)}
      />

      <Toast message={toastMessage} />
    </AppShell>
  );
}
