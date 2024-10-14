import React from 'react';
import './search-bar.scss';

const SearchBar = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (input: string) => void;
}) => {
  return (
    <div className={`search-bar`}>
      <div className={`search-bar__inner`}>
        <form className={`search-bar__form`}>
          <svg className="icon search-bar__icon">
            <use xlinkHref="#icon-magnifier" />
          </svg>
          <input
            type={`search`}
            className={`search-bar__input`}
            placeholder={placeholder}
            defaultValue={value}
            onChange={(e) => onChange(e.target.value.toLowerCase())}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
