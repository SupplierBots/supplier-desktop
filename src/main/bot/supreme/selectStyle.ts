import _ from 'lodash';
import { isMatch } from './isMatch';
import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';

export function selectStyle(this: SupremeTask, styles: ProductStyle[]) {
  const availableStyles = styles.filter(style => !style.isSoldOut);
  if (availableStyles.length === 0) return null;
  const primaryStyle = availableStyles.find(s => isMatch(s.name, this.product.colors));
  if (primaryStyle || !this.product.anyColor) return primaryStyle;
  return _.sample(availableStyles);
}
