export interface RunnerState {
  scheduled: boolean;
  time: string;
  proxies: boolean;
  proxiesRegion: 'eu' | 'us';
  localIPTasks: number;
  restocks: boolean;
  monitorDelay: number;
}
