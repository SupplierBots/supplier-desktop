export interface Response {
  url: Promise<string>;
  statusCode: Promise<number>;
  text(): Promise<string>;
  json(): Promise<any>;
}
