const VERIFY_CHROME = 'VERIFY_CHROME';

const CHROMIUM_VERIFIED = 'CHROMIUM_VERIFIED';

export interface ChromiumVerifiedPayload {
  success: boolean;
  executablePath: string;
}

const BROWSER_STATE_CHANGE = 'BROWSER_STATE_CHANGE';

export interface BrowserStatePayload {
  id: string;
  status: boolean;
}

const START_TASKS = 'START_TASKS';
const STOP_TASKS = 'STOP_TASKS';
const SET_BROWSER_EMAIL = 'SET_BROWSER_EMAIL';
const GET_SAME_EMAILS = 'GET_SAME_EMAILS';

export {
  VERIFY_CHROME,
  BROWSER_STATE_CHANGE,
  START_TASKS,
  CHROMIUM_VERIFIED,
  STOP_TASKS,
  GET_SAME_EMAILS,
  SET_BROWSER_EMAIL,
};
