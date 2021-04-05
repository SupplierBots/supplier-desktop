export interface PageElement {
  innerHTML: Promise<string>;
  innerText: Promise<string>;
  dataset: Promise<{ [key: string]: string }>;
  bounds: Promise<{ x: number; y: number; height: number; width: number }>;

  getAttribute(attribute: string): Promise<string | null>;
  click(): Promise<void>;
  autofill(value: string): Promise<void>;
  selectOption(value: string): Promise<void>;

  querySelector(selector: string): Promise<PageElement | null>;
  queryXPath(selector: string): Promise<PageElement | null>;
  querySelectorAll(selector: string): Promise<PageElement[]>;
}
