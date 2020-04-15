export interface RunnerState {
  scheduled: boolean;
  time: string;
  proxies: boolean;
  proxiesRegion: string;
  localIPTasks: number;
  restocks: boolean;
  monitorDelay: number;
}
