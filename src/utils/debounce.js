import { useCallback, useRef } from 'react';

export default function debounce(callback, delay) {
  const timer = useRef();

  const debounceCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  });

  return debounceCallback;
}
