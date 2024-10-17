'use client';

import './language-switch.scss';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

export const LanguageSwitch = (props: { label: string; locales: string[] }) => {
  const params = useParams();
  const router = useRouter();
  const { locale } = params;

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}`);
  };

  return (
    <div className="language-switch">
      <label htmlFor="language-switch-select">{`${props.label}:`}</label>
      <select
        value={locale}
        onChange={handleOnChange}
        id="language-switch-select"
        className={'language-switch__select'}
      >
        {props.locales.map((l) => {
          const label = l.split('-')[0].toUpperCase();
          return (
            <option key={l} value={l}>
              {label}
            </option>
          );
        })}
      </select>
      <span className="language-switch__arrow">
        <svg viewBox="0 0 24 24">
          <polygon
            points="7.1,8.3 11.7,12.9 16.3,8.3 17.7,9.7 11.7,15.7 5.7,9.7"
            fill="#FFFFFF"
          ></polygon>
        </svg>
      </span>
    </div>
  );
};
