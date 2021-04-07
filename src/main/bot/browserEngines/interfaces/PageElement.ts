export interface PageElement {
  innerHTML: Promise<string>;
  innerText: Promise<string>;
  dataset: Promise<{ [key: string]: string }>;

  getAttribute(attribute: string): Promise<string | null>;
  click(): Promise<void>;
  focus(): Promise<void>;
  pressKey(value: string): Promise<void>;
  tickCheckbox(): Promise<void>;
  selectOptionByLabel(label: string): Promise<void>;

  querySelector(selector: string): Promise<PageElement | null>;
  queryXPath(selector: string): Promise<PageElement | null>;
  querySelectorAll(selector: string): Promise<PageElement[]>;
}
