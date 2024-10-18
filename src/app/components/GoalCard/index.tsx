import React from 'react';
import cx from 'classnames';

import './goal-card.scss';
import Link from 'next/link';

const GoalCard = ({
  goal_id,
  title,
  href,
  saved,
  locales,
}: {
  title: string;
  href: string;
  saved: boolean | null;
  locales: {
    done: string;
    edit: string;
  };
  goal_id?: number;
}) => {
  const classNames = cx(
    'goal-card',
    goal_id && `goal-card--goal-` + goal_id,
    !!saved && `goal-card--saved`,
  );

  return (
    <Link href={href} className={classNames}>
      <div className="goal-card__figure"></div>
      <h3 className={`goal-card__title`}>{title}</h3>

      <div className="goal-card__status">
        <div className="goal-card__status-done">
          <svg className="icon">
            <use xlinkHref="#icon-check" />
          </svg>
        </div>
        {locales && (
          <>
            <span className="goal-card__status-done__text">{locales.done}</span>

            <span className="goal-card__status-edit">{locales.edit}</span>
          </>
        )}
      </div>
    </Link>
  );
};

export default GoalCard;
