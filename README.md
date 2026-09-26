# CSE-C Attendance System

A frontend-only, offline-first attendance app for CSE-C — React + Vite + Tailwind CSS + Framer Motion. No backend, no database, no network calls after load.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## Login

Username (same for all three): `cse`

Any one of these three passwords works:

| Member   | Password   |
| -------- | ---------- |
| Member 1 | ahmed112   |
| Member 2 | bansi212   |
| Member 3 | gowri123   |

Credentials live in `src/config/constants.js` — edit `AUTH_USERNAME` / `AUTH_USERS` there if you need to change them later.

## Notes

- 67 students, full roll numbers stored internally in `src/data/students.js`; only the last 3 characters ever display or get copied.
- No attendance percentage is shown or copied anywhere, per spec.
- Present/Absent apply instantly — no popups, toasts, or confirmations on those two actions. A small toast only appears for clipboard-copy actions and edits made from the Review screen.
- Keyboard shortcuts: `P` = Present, `A` = Absent, `←` = Previous.
- This login is a simple frontend gate only — there is no backend, so it isn't real security.
