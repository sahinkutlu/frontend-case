import { useEffect, useState } from 'react';

const useDebounce = <T extends unknown>(initialValue: T, timeOutInMs = 500): T => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(initialValue);
    }, timeOutInMs);

    // Clear the timer if the effect re-runs before the timeout
    return () => {
      clearTimeout(timer);
    };
  }, [initialValue, timeOutInMs]);

  return value;
};

export default useDebounce;
