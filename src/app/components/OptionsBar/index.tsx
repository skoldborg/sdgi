'use client';

import { useEffect, useState } from 'react';

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
  initialState?: number;
  onChangeHandler: (val: number) => void;
  options: Option[];
  otherOption: Option;
}) => {
  const [currentOptionValue, setCurrentOptionValue] = useState<number>();

  useEffect(() => {
    if (typeof initialState === 'number') {
      setCurrentOptionValue(initialState);
    }
  }, [initialState]);

  const setOption = (val: number) => {
    setCurrentOptionValue(val);

    onChangeHandler(val);
  };

  const renderOption = (option: Option, type?: 'as-card' | 'locked') => {
    const selected =
      typeof currentOptionValue === 'number' &&
      currentOptionValue === option.value
        ? true
        : false;

    return (
      <div className="m-1" key={option.value}>
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
    <div data-component="options-bar">
      <div className="flex justify-center flex-wrap md:flex-nowrap">
        {options.map((option) => renderOption(option, 'as-card'))}
      </div>

      {otherOption && (
        <div className="flex justify-center mt-6 md:mt-10">
          {renderOption(otherOption)}
        </div>
      )}
    </div>
  );
};
