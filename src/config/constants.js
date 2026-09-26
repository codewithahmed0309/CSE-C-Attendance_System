// Centralized frontend-only access-gate configuration.
// NOTE: This is not real security — there is no backend. It only gates
// casual access to the local attendance UI.

export const AUTH_USERNAME = 'cse';

// Three class representatives share one username but each has their own
// password. Any one of these passwords, paired with the shared username,
// grants access.
export const AUTH_USERS = [
  { label: 'Member 1', password: 'ahmed112' },
  { label: 'Member 2', password: 'bansi212' },
  { label: 'Member 3', password: 'gowri123' },
];

export const CLASS_LABEL = 'CSE-C';

export const SESSIONS = {
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon',
};
