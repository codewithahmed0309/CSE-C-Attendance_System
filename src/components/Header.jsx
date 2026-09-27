import { LogOut } from 'lucide-react';
import { CLASS_LABEL } from '../config/constants.js';

export default function Header({ session, date, onLogout }) {
  return (
    <header className="flex items-center justify-between border-b border-border px-5 py-3.5 sm:px-8">
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight text-text-primary">{CLASS_LABEL}</p>
        <p className="text-xs text-text-secondary">Attendance System</p>
      </div>

      <div className="flex items-center gap-4 text-right">
        {session && (
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-text-primary">{session}</p>
            <p className="text-xs text-text-secondary">{date}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          aria-label="Logout"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-absent/40 hover:text-absent"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
