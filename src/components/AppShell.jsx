import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function AppShell({ session, date, onLogout, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header session={session} date={date} onLogout={onLogout} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
