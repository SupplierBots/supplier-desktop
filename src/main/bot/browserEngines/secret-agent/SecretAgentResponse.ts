import { Response } from '../interfaces/Response';
import WebsocketResource from '@secret-agent/client/lib/WebsocketResource';
import Resource from '@secret-agent/client/lib/Resource';

export class SecretAgentResponse implements Response {
  constructor(readonly resource: WebsocketResource | Resource) {}
  async url(): Promise<string> {
    return this.resource.url;
  }
  async statusCode(): Promise<number> {
    return this.resource.response.statusCode;
  }
  async text(): Promise<string> {
    return this.resource.response.text();
  }
  json(): Promise<any> {
    return this.resource.response.json();
  }
}
