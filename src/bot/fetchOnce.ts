const fetchOnce = <T>(fn: () => Promise<T>) => {
  let promise: null | Promise<T> = null;

  const innerFn = (refresh = false) => {
    if (promise === null || refresh) {
      promise = fn();
    }
    return promise;
  };
  return innerFn;
};

export { fetchOnce };
