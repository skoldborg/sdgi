import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { KeyTextField } from '@prismicio/client';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  label: KeyTextField;
  color?: 'black' | 'black-70' | 'white' | 'gray' | 'ghost';
  size?: 'base' | 'small';
  href?: string;
  link?: string;
  onClick?:
    | React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    | undefined;
  opacity?: number;
  icon?: string;
  center?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export const Button = (props: ButtonProps) => {
  const {
    label,
    color = 'black',
    size = 'base',
    href,
    link,
    onClick,
    opacity,
    icon,
    center = false,
    className,
    disabled,
    type,
  } = props;

  const baseStyles =
    'relative text-center font-header font-bold tracking-widest whitespace-nowrap uppercase leading-6 mb-0 disabled:pointer-events-none disabled:bg-gray disabled:cursor-default z-10';

  // const slimStyles =
  //   'p-0 bg-white/0 underline text-black text-body font-normal normal-case';

  const sizes = {
    base: 'text-lg py-4 px-6',
    small: 'text-xs py-2 px-3 md:text-sm',
  };

  const colors = {
    black: 'bg-black text-white hover:bg-[#404040] [&>.icon]:fill-white',
    'black-70': 'bg-black/70 hover:bg-black text-white [&>.icon]:fill-white',
    white: 'text-black bg-white hover:bg-gray-light',
    gray: 'text-black bg-gray hover:bg-[#e4e4e4]',
    ghost: 'text-black bg-white/0 hover:bg-white/0',
  };

  const classNames = twMerge(
    baseStyles,
    sizes[size],
    colors[color],
    center ? 'block mx-auto' : 'inline-block',
    icon &&
      'tracking-normal text-center pl-16 [&>.icon]:w-7 [&>.icon]:h-7 [&>.icon]:absolute [&>.icon]:left-[22px] [&>.icon]:top-4',
    className && className,
  );

  if (href) {
    return (
      <a href={href} rel="noopener noreferrer" className={classNames}>
        <span className={`button__inner`}>{label}</span>
      </a>
    );
  }

  if (link) {
    return (
      <Link
        href={link ?? '#'}
        className={classNames}
        data-opacity={opacity}
        onClick={onClick && onClick}
        aria-disabled={disabled}
      >
        <span className={`button__inner`}>{label}</span>
      </Link>
    );
  }

  return (
    <button
      className={cx(classNames)}
      onClick={onClick}
      data-opacity={opacity && opacity}
      disabled={disabled}
      type={type}
    >
      {icon && (
        <svg className="icon">
          <use xlinkHref="#icon-print" />
        </svg>
      )}
      <span className={`button__inner`}>{label}</span>
    </button>
  );
};
