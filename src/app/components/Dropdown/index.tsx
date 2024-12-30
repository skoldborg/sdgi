'use client';

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';

interface DropdownI extends PropsWithChildren {
  show: boolean;
}

export const Dropdown = (props: DropdownI) => {
  const dropdown = useRef(null);
  const [open, setOpen] = useState(false);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ESC') {
      e.preventDefault();
      closeDropdown();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.className !== 'dropdown') {
      closeDropdown();
    }
  };

  const addEventListeners = useCallback(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('click', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('click', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDropdown = useCallback(() => {
    setOpen(true);
    addEventListeners();
  }, [setOpen, addEventListeners]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    removeEventListeners();
  }, [setOpen, removeEventListeners]);

  useEffect(() => {
    if (props.show) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }, [props.show, closeDropdown, openDropdown]);

  return (
    <div
      data-component="dropdown"
      ref={dropdown}
      className={cx(
        'absolute top-[75px] right-0 lg:top-18 py-8 px-10 bg-white z-10',
        'shadow-[0_2px_7px_0_rgba(0,0,0,0.2)]',
        open ? 'block' : 'hidden',
      )}
      aria-hidden={!open}
    >
      <span
        className={cx(
          'absolute w-0 h-0 top-0 right-[5px] ml-3',
          'border-[12px] border-solid border-t-white/0 border-r-white/0 border-b-white border-l-white',
          'origin-top-left rotate-[135deg]',
          'shadow-[-3px_3px_7px_0_rgba(0,0,0,0.1)]',
        )}
      ></span>
      <div>{props.children}</div>
    </div>
  );
};
