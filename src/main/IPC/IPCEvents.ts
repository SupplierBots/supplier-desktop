const START_TASKS = 'START_TASKS';
const TASKS_STARTED = 'TASKS_STARTED';
const STOP_TASKS = 'STOP_TASKS';
const TASKS_STOPPED = 'TASKS_STOPPED';
const SET_TASK_ACTIVITY = 'SET_TASK_ACTIVITY';

const SETUP_HARVESTER = 'SETUP_HARVESTER';
const SET_HARVESTER_EMAIL = 'SET_HARVESTER_EMAIL';
const GET_SAME_EMAILS = 'GET_SAME_EMAILS';
const HARVESTER_STATE_CHANGE = 'HARVESTER_STATE_CHANGE';
const REPORT_CHECKOUT = 'REPORT_CHECKOUT';

const CHECK_CHROME = 'CHECK_CHROME';
const BROWSER_ENGINE_DOWNLOAD_PROGRESS = 'BROWSER_ENGINE_DOWNLOAD_PROGRESS';
const CHECK_BROWSER_ENGINE = 'CHECK_BROWSER_ENGINE';
const DOWNLOAD_BROWSER_ENGINE = 'DOWNLOAD_BROWSER_ENGINE';
const TEST_WEBHOOK = 'TEST_WEBHOOK';

const WINDOW_MINIMIZE = 'WINDOW_MINIMIZE';
const WINDOW_CLOSE = 'WINDOW_CLOSE';
const RELAUNCH = 'RELAUNCH';

const GET_PROFILE = 'GET_PROFILE';
const GET_PRODUCT = 'GET_PRODUCT';
const GET_DELAYS = 'GET_DELAYS';
const GET_PROXY = 'GET_PROXY';
const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';
const RESET_TIMER_STATE = 'RESET_TIMER_STATE';

const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
const UPDATE_DOWNLOAD_PROGRESS = 'UPDATE_DOWNLOAD_PROGRESS';
const UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';
const UPDATE_DOWNLOAD_ERROR = 'UPDATE_DOWNLOAD_ERROR';
const DOWNLOAD_UPDATE = 'DOWNLOAD_UPDATE';

export interface ChromeVerifiedPayload {
  success: boolean;
  executablePath: string;
  version: string;
}

export interface HarvesterStatePayload {
  id: string;
  status: boolean;
}

export {
  TASKS_STARTED,
  TASKS_STOPPED,
  GET_DELAYS,
  CHECK_CHROME,
  HARVESTER_STATE_CHANGE,
  START_TASKS,
  STOP_TASKS,
  GET_SAME_EMAILS,
  SET_HARVESTER_EMAIL,
  SETUP_HARVESTER,
  WINDOW_MINIMIZE,
  WINDOW_CLOSE,
  GET_PROFILE,
  UPDATE_TASK_STATUS,
  GET_PRODUCT,
  GET_PROXY,
  UPDATE_AVAILABLE,
  UPDATE_DOWNLOAD_PROGRESS,
  UPDATE_DOWNLOADED,
  UPDATE_DOWNLOAD_ERROR,
  DOWNLOAD_UPDATE,
  RELAUNCH,
  REPORT_CHECKOUT,
  RESET_TIMER_STATE,
  SET_TASK_ACTIVITY,
  TEST_WEBHOOK,
  DOWNLOAD_BROWSER_ENGINE,
  CHECK_BROWSER_ENGINE,
  BROWSER_ENGINE_DOWNLOAD_PROGRESS,
};
