import { Page } from 'puppeteer';
import { Task } from './Task';

export interface HybridTask {
  page: Page;
  task: Task;
}
