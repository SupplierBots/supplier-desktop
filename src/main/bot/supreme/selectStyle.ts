import _ from 'lodash';
import { isMatch } from './isMatch';
import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';

export function selectStyle(this: SupremeTask, styles: ProductStyle[]) {
  const availableStyles = styles.filter(
    style => !style.isSoldOut && !this.soldOutStyles.includes(style.name),
  );

  if (availableStyles.length === 0) return null;
  const primaryStyle = availableStyles.find(s => isMatch(s.name, this.details.colors));
  if (primaryStyle || !this.details.anyColor) return primaryStyle ?? null;
  return _.sample(availableStyles) ?? null;
}
