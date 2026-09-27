import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { AUTH_USERNAME, AUTH_USERS, CLASS_LABEL } from '../config/constants.js';

export default function LoginPage({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const usernameOk = username.trim().toLowerCase() === AUTH_USERNAME.toLowerCase();
    const match = AUTH_USERS.find((u) => u.password === password);

    if (usernameOk && match) {
      setError('');
      onSuccess(match.label);
      return;
    }

    setError('Invalid username or password');
    setShake(true);
    setTimeout(() => setShake(false), 420);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(600px circle at 50% 20%, rgba(59,130,246,0.08), transparent 60%)',
        }}
      />

      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm rounded-xl border border-border bg-surface p-8 shadow-2xl shadow-black/40"
      >
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold tracking-tight text-text-primary">{CLASS_LABEL}</p>
          <p className="mt-1 text-sm text-text-secondary">Attendance System</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1.5 block text-xs font-medium text-text-secondary">
              Username
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-elevated px-3 py-2.5 focus-within:border-accent">
              <User size={15} className="text-text-secondary" />
              <input
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary/60"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-text-secondary">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-elevated px-3 py-2.5 focus-within:border-accent">
              <Lock size={15} className="text-text-secondary" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary/60"
                placeholder="Enter password"
              />
            </div>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-xs font-medium text-absent">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          Login
        </button>
      </motion.form>
    </div>
  );
}
