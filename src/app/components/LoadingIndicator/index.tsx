import React from 'react';
import './loading-indicator.scss';

export const LoadingIndicator = () => (
  <div className="loading-indicator">
    <div className="loading-indicator__circle loading-indicator__circle--1"></div>
    <div className="loading-indicator__circle loading-indicator__circle--2"></div>
    <div className="loading-indicator__circle loading-indicator__circle--3"></div>
  </div>
);
