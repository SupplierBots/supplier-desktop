const fetchOnce = <T>(fn: () => Promise<T>) => {
  let promise: null | Promise<T> = null;
  let isPending = false;
  const onFinished = () => (isPending = false);

  const innerFn = (refresh = false) => {
    if (promise === null || (refresh && !isPending)) {
      isPending = true;
      promise = fn();
      promise.then(onFinished).catch(onFinished);
    }
    return promise;
  };
  return innerFn;
};

export { fetchOnce };
