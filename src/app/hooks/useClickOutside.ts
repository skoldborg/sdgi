import { MutableRefObject, useEffect } from 'react';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const useClickOutside = (ref: MutableRefObject<any>, callback: any) => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
