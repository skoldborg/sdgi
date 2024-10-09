import React from 'react';
import cx from 'classnames';
import './button.scss';
import Link from 'next/link';
import { KeyTextField } from '@prismicio/client';

interface ButtonProps {
  label: KeyTextField;
  color?: string;
  size?: string;
  href?: string;
  link?: string;
  onClick?: () => void;
  opacity?: number;
  icon?: string;
  position?: 'center';
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    label,
    color,
    size,
    href,
    link,
    onClick,
    opacity,
    icon,
    position,
    disabled,
  } = props;
  const classNames = cx(
    'button',
    color && 'button--' + color,
    size && 'button--' + size,
    icon && 'button--with-icon',
    position && 'button--' + position,
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
      <Link href={link ?? '#'} className={classNames} data-opacity={opacity}>
        <span className={`button__inner`}>{label}</span>
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      onClick={onClick}
      data-opacity={opacity && opacity}
      disabled={disabled}
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
