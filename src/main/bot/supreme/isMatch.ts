import { Keywords } from '../../types/Keywords';

export function isMatch(name: string, { positive, negative, multi }: Keywords) {
  name = name.toLowerCase();
  if (!positive.every(p => name.includes(p))) return false;
  if (negative.some(n => name.includes(n))) return false;
  if (!multi) return true;

  for (const keyword of multi) {
    const words = keyword.split(' | ');
    if (!words.some(w => name.includes(w))) return false;
  }
  return true;
}
