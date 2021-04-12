import _ from 'lodash';
import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';

export function selectStyle(this: SupremeTask, styles: ProductStyle[]) {
  const availableStyles = styles.filter(
    style =>
      !style.isSoldOut &&
      !this.soldOutStyles.includes(style.name) &&
      !this.details.colors.negative.some(c => style.name.toLowerCase().includes(c)),
  );
  if (availableStyles.length === 0) return null;
  const primaryStyle = availableStyles.find(s =>
    this.details.colors.positive.some(c => s.name.toLowerCase().includes(c)),
  );
  if (primaryStyle || !this.details.anyColor) return primaryStyle ?? null;
  return _.sample(availableStyles) ?? null;
}
