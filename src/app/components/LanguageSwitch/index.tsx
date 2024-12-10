'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

export const LanguageSwitch = (props: { label: string; locales: string[] }) => {
  const params = useParams();
  const router = useRouter();
  const { locale } = params;

  const setCookie = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  };

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCookie(e.target.value);
    router.push(`/${e.target.value}`);
  };

  return (
    <div className="relative py-2 pl-3">
      <label
        htmlFor="language-switch-select"
        className="ally-hidden"
      >{`${props.label}:`}</label>
      <select
        value={locale}
        onChange={handleOnChange}
        id="language-switch-select"
        className="font-header text-sm w-10 appearance-none"
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
      <span className="inline-block absolute top-1/2 -right-0.5 -translate-y-1/2 w-4 h-4 pointer-events-none">
        <svg viewBox="0 0 24 24" className="fill-black w-full h-full">
          <polygon
            points="7.1,8.3 11.7,12.9 16.3,8.3 17.7,9.7 11.7,15.7 5.7,9.7"
            className="fill-black w-full h-full"
          ></polygon>
        </svg>
      </span>
    </div>
  );
};
