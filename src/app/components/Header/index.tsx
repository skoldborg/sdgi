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

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href={`/${locale}`} className={styles.logo}></a>

        <ul className={styles.nav}>
          {data?.internal_links &&
            data.internal_links.map((internalLink) => {
              return (
                <li
                  key={internalLink.label}
                  className={`${styles.navItem} ${styles.hiddenS}`}
                >
                  <Button
                    className="h-margin-bottom-0"
                    label={internalLink.label}
                    href={`/${locale}/articles/${internalLink.link}`}
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
                  className="h-margin-bottom-0"
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
