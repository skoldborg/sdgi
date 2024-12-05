'use client';

import { ReactNode, useState } from 'react';
import classNames from 'classnames';

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
    <div className="bg-white">
      <button
        className="flex w-full items-center relative h-12 border-solid border-t border-b border-gray-light uppercase font-header font-semibold text-lg"
        aria-controls={`content-${id}`}
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span
          className={classNames(
            "bg-[url('/icons/chevron.svg')] absolute block top-4 right-0 w-4 h-4 bg-center bg-no-repeat transition-transform origin-center sm:right-2 duration-150",
            expanded ? 'rotate-180' : 'rotate-0',
          )}
        ></span>
        {expanded ? closeLabel : openLabel}
      </button>

      <div
        className={classNames(!expanded && 'h-0 overflow-hidden')}
        id={`content-${id}`}
        aria-hidden={!expanded}
      >
        <div className="py-7">{children}</div>
      </div>
    </div>
  );
};
