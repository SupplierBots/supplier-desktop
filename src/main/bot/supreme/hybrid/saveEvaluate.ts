import SupremeHybridTask from './SupremeHybridTask';

export async function saveEvaluate<T>(this: SupremeHybridTask, code: string) {
  if (!this.page || this.page.isClosed()) return;
  const result = await this.page.evaluate(code);
  return result as T;
}
