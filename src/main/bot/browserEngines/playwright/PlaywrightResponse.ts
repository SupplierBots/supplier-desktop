import { Response as EngineResponse } from 'playwright-core';
import { Response } from '../interfaces/Response';

export class PlaywrightResponse implements Response {
  constructor(readonly response: EngineResponse) {}

  get url(): Promise<string> {
    return Promise.resolve(this.response.url());
  }
  get statusCode(): Promise<number> {
    return Promise.resolve(this.response.status());
  }
  text(): Promise<string> {
    return this.response.text();
  }
  json(): Promise<any> {
    return this.response.json();
  }
}
