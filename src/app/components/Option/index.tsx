'use client';

import cx from 'classnames';
import './option.scss';

export const Option = ({
  label,
  value,
  clickHandler,
  selected,
  type,
  size,
}: {
  label: string;
  value: number;
  clickHandler: () => void;
  selected: boolean;
  type?: 'locked' | 'as-card';
  size?: 'small' | 'large';
}) => {
  const classNames = cx(
    'option',
    type && `option--${type}`,
    selected && 'option--selected',
    size && 'option--' + size,
  );

  return (
    <button
      className={`${classNames}`}
      data-value={value}
      onClick={clickHandler}
    >
      {label}

      <div className={`option__checkbox`}>
        <svg className="icon">
          <use xlinkHref="#icon-check" />
        </svg>
      </div>
    </button>
  );
};
