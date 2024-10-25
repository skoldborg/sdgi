'use client';

import { ReactNode, useState } from 'react';
import styles from './accordion.module.scss';

export const Accordion = ({
  children,
  id,
  openLabel,
  closeLabel,
}: {
  id: number;
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.root}>
      <button
        className={styles.header}
        aria-controls={`content-${id}`}
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? closeLabel : openLabel}
      </button>

      <div
        className={styles.content}
        id={`content-${id}`}
        aria-hidden={!expanded}
      >
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};
