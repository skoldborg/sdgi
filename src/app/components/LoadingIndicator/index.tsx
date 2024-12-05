import React from 'react';
import './loading-indicator.scss';
import classNames from 'classnames';

export const LoadingIndicator = ({
  additionalClasses,
}: {
  additionalClasses?: string;
}) => (
  <div
    className={classNames(
      'loading-indicator',
      additionalClasses && additionalClasses,
    )}
  >
    <div className="loading-indicator__circle loading-indicator__circle--1"></div>
    <div className="loading-indicator__circle loading-indicator__circle--2"></div>
    <div className="loading-indicator__circle loading-indicator__circle--3"></div>
  </div>
);
