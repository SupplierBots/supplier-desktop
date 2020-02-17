import { Keywords } from 'types/Keywords';
import * as R from 'ramda';

const isMatch = (name: string, keywords: Keywords) => {
  name = name.toLowerCase();

  if (!R.all(R.includes(R.__, name))(keywords.positive)) return false;

  if (R.any(R.includes(R.__, name))(keywords.negative)) return false;

  if (!keywords.multi) return true;

  for (const keyword of keywords.multi) {
    const words = keyword.split(' | ');
    if (R.none(R.includes(R.__, name))(words)) return false;
  }
  return true;
};

export { isMatch };
