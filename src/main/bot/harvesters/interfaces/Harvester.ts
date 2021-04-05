import { HarvesterData } from 'main/types/HarvesterData';

export interface Harvester {
  data: HarvesterData;
  sitekey: string;
  isSolving: boolean;
  isReady: boolean;
  initialize(index: number): Promise<void>;
  load(): Promise<void>;
  setup(): Promise<void>;
  close(): Promise<void>;
  getToken(sitekey?: string): Promise<string>;
}
