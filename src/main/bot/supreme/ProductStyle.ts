import { ISuperElement } from 'awaited-dom/base/interfaces/super';

export interface ProductStyle {
  name: string;
  url: string;
  isSoldOut: boolean;
  element: ISuperElement;
}
