import React, { MouseEvent } from 'react';
import cx from 'classnames';
import './box.scss';
import { Goal } from '@/@types/codegen/types';

export const Box = ({
  goal,
  onClick,
}: {
  goal?: Goal;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { goal_id } = goal ? goal : {};
  const classNames = cx('box', goal && 'box--with-content');

  return (
    <button className={classNames} onClick={onClick && onClick}>
      <div className={`box__content box__content--goal-${goal_id}`}>
        <span>{goal_id && goal_id}</span>
      </div>
    </button>
  );
};
