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

const SETUP_BROWSER = 'SETUP_BROWSER';
const SET_BROWSER_EMAIL = 'SET_BROWSER_EMAIL';
const GET_SAME_EMAILS = 'GET_SAME_EMAILS';

const VERIFY_CHROME = 'VERIFY_CHROME';
const DOWNLOAD_CHROMIUM = 'DOWNLOAD_CHROMIUM';
const CHROMIUM_DOWNLOAD_PROGRESS = 'CHROMIUM_DOWNLOAD_PROGRESS';

const WINDOW_MINIMIZE = 'WINDOW_MINIMIZE';
const WINDOW_CLOSE = 'WINDOW_CLOSE';

export {
  VERIFY_CHROME,
  BROWSER_STATE_CHANGE,
  START_TASKS,
  STOP_TASKS,
  GET_SAME_EMAILS,
  SET_BROWSER_EMAIL,
  SETUP_BROWSER,
  DOWNLOAD_CHROMIUM,
  CHROMIUM_DOWNLOAD_PROGRESS,
  WINDOW_MINIMIZE,
  WINDOW_CLOSE,
};