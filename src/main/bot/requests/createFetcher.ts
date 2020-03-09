const createFetcher = <T>(fn: () => Promise<T>, delay = 0) => {
  let promise: null | Promise<T> = null;
  let isPending = false;
  let lastFetch: number;

  const onFinished = () => {
    isPending = false;
    lastFetch = Date.now();
  };

  const innerFn = (refresh = false, forceRefresh = false) => {
    if (
      promise === null ||
      (!isPending && forceRefresh) ||
      (!isPending && refresh && (isNaN(lastFetch) || Date.now() - lastFetch > delay))
    ) {
      isPending = true;
      promise = fn();
      promise.then(onFinished).catch(onFinished);
    }
    return promise;
  };

  return {
    get: () => innerFn(false),
    refresh: () => innerFn(true),
    forceRefresh: () => innerFn(false, true),
  };
};

export { createFetcher };
