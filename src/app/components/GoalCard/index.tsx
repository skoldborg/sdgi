import React from 'react';
import cx from 'classnames';

import styles from './goal-card.module.css';
import Link from 'next/link';

export const GoalCard = ({
  goal_id,
  title,
  href,
  saved = false,
  locales,
}: {
  title?: string;
  href?: string;
  saved?: boolean | null;
  locales?: {
    done: string;
    edit: string;
  };
  goal_id?: number;
}) => {
  const classNames = cx(
    'group',
    'flex justify-center w-full h-full bg-white/0 pb-6',
    'shadow-[0px_2px_10px_0px_rgba(0,0,0,0)] hover:shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)]',
    styles.root,

    !!saved && `bg-white/100`,
  );

  return (
    <Link data-component="goal-card" href={href ?? '#'} className={classNames}>
      <div
        className="relative h-0 pb-[100%] w-[calc(100%-24px)] bg-no-repeat bg-contain bg-center print:w-full"
        style={{
          backgroundImage: `url('/images/goals/goal-${goal_id}.svg')`,
        }}
      ></div>
      {title && <h3 className="hidden">{title}</h3>}

      <div
        className={cx(
          'absolute items-center bottom-0 left-0 w-full h-9 overflow-hidden',
          saved ? 'flex' : `hidden`,
        )}
      >
        <div className="bg-black rounded-full w-[14px] h-[14px] flex justify-center items-center ml-3">
          <svg className="icon w-3 h-3 fill-white">
            <use xlinkHref="#icon-check" />
          </svg>
        </div>
        {locales && (
          <>
            <span className="text-black text-xs opacity-50 ml-2">
              {locales.done}
            </span>

            <span
              className={cx(
                'text-sm font-bold uppercase font-header ml-auto pr-[14px]',
                'translate-y-1 opacity-0 transition-all duration-300 ease-in-expo',
                'group-hover:translate-y-0 group-hover:opacity-100',
              )}
            >
              {locales.edit}
            </span>
          </>
        )}
      </div>
    </Link>
  );
};
