'use client';

import { useState } from 'react';
import './options-bar.scss';

import { Option } from '../Option';

type Option = {
  label: string;
  value: number;
};

export const OptionsBar = ({
  initialState,
  onChangeHandler,
  options,
  otherOption,
}: {
  initialState: number;
  onChangeHandler: (val: number) => void;
  options: Option[];
  otherOption: Option;
}) => {
  const [currentOptionValue, setCurrentOptionValue] = useState(
    initialState ?? undefined,
  );

  const setOption = (val: number) => {
    setCurrentOptionValue(val);

    onChangeHandler(val);
  };

  const renderOption = (option: Option, type?: 'as-card' | 'locked') => {
    const selected =
      currentOptionValue && currentOptionValue === option.value ? true : false;

    return (
      <div className="options-bar__option" key={option.value}>
        <Option
          selected={selected}
          clickHandler={() => setOption(option.value)}
          {...option}
          {...(type && { type })}
        />
      </div>
    );
  };

  return (
    <div className={`options-bar`}>
      <div className="options-bar__options">
        {options.map((option) => renderOption(option, 'as-card'))}
      </div>

      {otherOption && (
        <div className="options-bar__other-option">
          {renderOption(otherOption)}
        </div>
      )}
    </div>
  );
};
