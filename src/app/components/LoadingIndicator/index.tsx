import React from 'react';
import classNames from 'classnames';

export const LoadingIndicator = ({
  centered = true,
  additionalClasses,
}: {
  centered?: boolean;
  additionalClasses?: string;
}) => (
  <div
    className={classNames(
      'mt-25 w-16 text-center',
      centered && 'mx-auto',
      additionalClasses && additionalClasses,
    )}
  >
    <div className="loading-indicator-circle loading-indicator-circle--1"></div>
    <div className="loading-indicator-circle loading-indicator-circle--2"></div>
    <div className="loading-indicator-circle loading-indicator-circle--3"></div>
  </div>
);
