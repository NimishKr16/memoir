// hooks/useLongPress.ts
import { useRef } from 'react';

export function useLongPress(callback: () => void, ms = 700) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    timerRef.current = setTimeout(callback, ms);
  };

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  };
}