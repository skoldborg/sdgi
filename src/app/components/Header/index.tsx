'use client';

import { Button, LoadingIndicator, Avatar, Dropdown } from '@components';
import { useParams } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './header.module.scss';
import { HeaderDocument } from '@prismicio-types';
import { PropsWithChildren } from 'react';
import { useUIContext } from '@/app/contexts/ui-context';

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
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href={`/${locale}`} className={styles.logo}></a>

        <ul className={styles.nav}>
          {internalLinks &&
            internalLinks.map((internalLink) => {
              return (
                <li
                  key={internalLink.label}
                  className={`${styles.navItem} ${styles.hiddenS}`}
                >
                  <Button
                    label={internalLink.label}
                    href={`/${locale}/articles/${internalLink.link.uid}`}
                    color={`white`}
                    size={`small`}
                  />
                </li>
              );
            })}
          {children}

          {user && user.name && (
            <li className={styles.navItem}>
              <Avatar
                initials={user?.name.substring(0, 1).toUpperCase()}
                onClick={() => openHeaderDropdown()}
              />
              <Dropdown show={headerDropdownOpen} key={1}>
                <Button
                  href={`/api/auth/logout`}
                  label={data.log_out}
                  size={`small`}
                />
              </Dropdown>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
