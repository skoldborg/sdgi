'use client';

import { Button, LoadingIndicator, Avatar, Dropdown } from '@components';
import { useParams } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { HeaderDocument } from '@prismicio-types';
import { PropsWithChildren } from 'react';
import { useUIContext } from '@/app/contexts/ui-context';
import cx from 'classnames';

interface HeaderI extends PropsWithChildren {
  doc: HeaderDocument<string>;
}

type InternalLink = {
  label: string;
  link: {
    id: string;
    lang: string;
    slug: string;
    uid: string;
  };
};

export const Header = ({ doc, children }: HeaderI) => {
  const params = useParams();
  const { locale } = params;
  const { user } = useUser();

  const { headerDropdownOpen, setHeaderDropdownOpen } = useUIContext();

  const openHeaderDropdown = () => {
    setHeaderDropdownOpen(!headerDropdownOpen);
  };

  if (!doc) return <LoadingIndicator />;

  const { data } = doc;

  const internalLinks = data.internal_links as InternalLink[];

  return (
    <header className="relative w-full flex bg-white border-b border-solid border-gray-light">
      <div className="relative flex h-full w-full max-w-6xl mx-auto justify-center items-center py-7 px-3 lg:px-6">
        <a
          href={`/${locale}`}
          className={cx(
            'flex justify-start items-center w-[164px] h-10 text-black font-header',
            "bg-contain bg-no-repeat bg-center bg-[url('/images/siat-logo.svg')] max-w-[150px] md:max-w-none",
          )}
        ></a>

        <ul className="flex justify-end items-center my-2 ml-auto">
          {internalLinks &&
            internalLinks.map((internalLink) => {
              return (
                <li
                  key={internalLink.label}
                  className="hidden md:inline-block mx-3 last-of-type:mr-0"
                >
                  <Button
                    label={internalLink.label}
                    href={`/${locale}/articles/${internalLink.link.uid}`}
                    color="white"
                    size="small"
                  />
                </li>
              );
            })}
          {children}

          {user && user.name && (
            <li className="mx-3 last-of-type:mr-0">
              <Avatar
                initials={user?.name.substring(0, 1).toUpperCase()}
                onClick={() => openHeaderDropdown()}
              />
              <Dropdown show={headerDropdownOpen} key={1}>
                <Button
                  href={`/api/auth/logout`}
                  label={data.log_out}
                  size="small"
                />
              </Dropdown>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
