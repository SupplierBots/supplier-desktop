import SupremeTask from './SupremeTask';

export async function saveEvaluate<T>(this: SupremeTask, code: string) {
  if (!this.isActive || this.page.isClosed()) return;
  const result = await this.page.evaluate(code);
  return result as T;
}
