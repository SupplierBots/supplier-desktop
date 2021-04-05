import { PageElement } from '../browserEngines/interfaces/PageElement';

export interface ProductStyle {
  name: string;
  url: string;
  isSoldOut: boolean;
  element: PageElement;
}
