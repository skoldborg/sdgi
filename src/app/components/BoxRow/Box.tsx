import React, { MouseEvent } from 'react';
import cx from 'classnames';
import { Goal } from '@/@types/codegen/types';

const baseStyles =
  'relative inline-block w-11 h-11 mx-1 bg-inherit print:w-6 print:h-6';

const goalBgs = [
  'bg-goal-1',
  'bg-goal-2',
  'bg-goal-3',
  'bg-goal-4',
  'bg-goal-5',
  'bg-goal-6',
  'bg-goal-7',
  'bg-goal-8',
  'bg-goal-9',
  'bg-goal-10',
  'bg-goal-11',
  'bg-goal-12',
  'bg-goal-13',
  'bg-goal-14',
  'bg-goal-15',
  'bg-goal-16',
  'bg-goal-17',
];

export const EmptyBox = () => {
  return (
    <div
      className={cx(
        baseStyles,
        'border-2 border-solid border-current',
        'group-[.box-color-gray]:bg-gray-light group-[.box-color-gray]:text-gray-dark/50',
        'group-[.box-color-gray-light]:text-gray-medium',
        'group-[.box-color-green]:text-green/50',
        'group-[.box-color-red]:text-red/50',
      )}
    ></div>
  );
};

export const Box = ({
  goal,
  onClick,
}: {
  goal?: Goal;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { goal_id } = goal ? goal : {};

  const boxStyles =
    'scale-100 origin-center transition-all duration-150 ease-in-expo hover:scale-110 shadow-[0_0_5px_0_rgba(0,0,0,0.4)] hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.4)]';
  const classNames = cx(baseStyles, boxStyles);

  return (
    <button className={classNames} onClick={onClick && onClick}>
      <div
        className={cx(
          goal_id && goalBgs[goal_id - 1],
          'absolute top-0 left-0 flex justify-center items-center font-header font-bold text-xl text-white pointer-events-none print-color-adjust',
          'animate-scale-up',
          'w-[45px] print:w-6',
          'h-[45px] print:h-6',
          'print:text-sm print:shadow-none',
        )}
      >
        <span className="origin-center print:text-white">
          {goal_id && goal_id}
        </span>
      </div>
    </button>
  );
};
