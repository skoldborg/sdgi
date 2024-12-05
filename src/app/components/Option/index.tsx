'use client';

import cx from 'classnames';

export const Option = ({
  label,
  value,
  clickHandler,
  selected,
  type,
  size,
  additionalClasses,
}: {
  label: string;
  value?: number;
  clickHandler?: () => void;
  selected?: boolean;
  type?: 'locked' | 'as-card';
  size?: 'small' | 'large';
  additionalClasses?: string;
}) => {
  const classNames = cx(
    'group',
    'relative flex justify-center items-center py-4 px-7 bg-white',
    'font-header font-bold uppercase md:text-[22px]',
    'border border-solid border-black/20 rounded-sm overflow-hidden',
    'transition-all duration-200 ease-in-expo',
    'hover:shadow-[0_3px_12px_2px_rgba(0,0,0,0.1)] hover:cursor-pointer',
    type !== 'locked' && 'focus:border-none',

    type === 'as-card' && `w-[105px] h-[165px] md:w-[165px] md:h-[225px]`,
    size === 'small' && 'text-base py-2 px-5',
    selected && 'border-none',
    size && 'option--' + size,
    additionalClasses,
  );

  return (
    <button
      className={`${classNames}`}
      data-value={value}
      onClick={clickHandler && clickHandler}
    >
      {/* Animated border */}
      <span
        className={cx(
          'block absolute top-0 left-0 w-full h-full border-4 border-solid border-black',
          selected ? 'scale-100' : 'scale-125',
          'group-focus:scale-100',
          'transition-transform duration-100 ease-linear',
        )}
      ></span>
      {label}

      <div
        className={cx(
          `absolute block bg-black text-white`,
          'transition-transform duration-100 ease-linear',
          'focus:rotate-45 focus:scale-100',
          selected ? 'rotate-45 scale-100' : 'rotate-45 scale-0',
          'group-focus:rotate-45 group-focus:scale-100',
          type === 'locked' && 'hidden',
          type === 'as-card'
            ? '-top-[60px] -right-[60px] w-[120px] h-[120px]'
            : '-top-8 -right-8 w-14 h-14',
        )}
      >
        <svg
          className={cx(
            'absolute fill-white -rotate-45',
            type === 'as-card'
              ? 'bottom-[10px] right-[45px] w-[30px] h-[30px]'
              : 'bottom-1 right-5 w-[22px] h-[22px]',
          )}
        >
          <use xlinkHref="#icon-check" />
        </svg>
      </div>
    </button>
  );
};
