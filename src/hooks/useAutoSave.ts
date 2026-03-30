import {useEffect, useRef} from 'react';

/** Calls `onSave` with the latest value after `delay` ms of inactivity */
export function useAutoSave(value: string, onSave: (value: string) => void, delay = 1000) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const savedRef = useRef(value);

  useEffect(() => {
    if (value === savedRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onSave(value);
      savedRef.current = value;
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, onSave, delay]);

  // Save immediately on unmount if there are unsaved changes
  useEffect(() => {
    return () => {
      if (savedRef.current !== value) {
        onSave(value);
      }
    };
  }, []);
}
