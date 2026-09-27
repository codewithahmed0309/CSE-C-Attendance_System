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

// Paste the "Web app URL" you get after deploying the Apps Script
// (see google-apps-script.js) here. Leave empty to keep the app fully
// offline — the Sync button will just tell the user it isn't configured.
export const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwKXHbN_LR-r_M77KtQyQMr0mULoJFS0Pxtm81kZ3gn2OQRA-dPrz1UPdW07xuaAnmy/exec';
