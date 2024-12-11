import React from 'react';

export const SearchBar = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (input: string) => void;
}) => {
  return (
    <div className="max-w-screen-lg mx-auto mb-6 lg:mb-12">
      <div className={`search-bar__inner`}>
        <form className="relative">
          <svg className="icon w-6 h-6 absolute left-0 top-1/2 -translate-y-1/2 lg:w-8 lg:h-8">
            <use xlinkHref="#icon-magnifier" />
          </svg>
          <input
            type={`search`}
            className="border-b-black border-solid border-b-2 w-full block py-2 pr-2 lg:text-2xl pl-8 lg:pl-12 placeholder-gray-dark"
            placeholder={placeholder}
            defaultValue={value}
            onChange={(e) => onChange(e.target.value.toLowerCase())}
          />
        </form>
      </div>
    </div>
  );
};
