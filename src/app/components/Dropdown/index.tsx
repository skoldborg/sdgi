'use client';

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './dropdown.module.scss';

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
    <div ref={dropdown} className={styles.dropdown} aria-hidden={!open}>
      <div>{props.children}</div>
    </div>
  );
};
