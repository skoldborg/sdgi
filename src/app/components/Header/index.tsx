'use client';

import { Button, LoadingIndicator, Avatar, Dropdown } from '@components';
import { useParams, usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './header.module.scss';
import { HeaderDocument } from '../../../../prismicio-types';
import { PropsWithChildren } from 'react';
import { useUIContext } from '@/app/contexts/ui-context';

interface HeaderI extends PropsWithChildren {
  doc: HeaderDocument<string>;
}

export const Header = ({ doc, children }: HeaderI) => {
  const pathname = usePathname();
  const params = useParams();
  const { locale } = params;
  const { user } = useUser();

  const {
    headerDropdownOpen,
    openAssessmentModal,
    setHeaderDropdownOpen,
    setCreateAssessmentModalOpen,
  } = useUIContext();

  const openHeaderDropdown = () => {
    setHeaderDropdownOpen(!headerDropdownOpen);
    setCreateAssessmentModalOpen(false);
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
                    label={internalLink.label}
                    href={`/${locale}/articles/${internalLink.link}`}
                    color={`white`}
                    size={`small`}
                  />
                </li>
              );
            })}
          {children}

          {pathname == `/${locale}/tool/assessments` && (
            <li className={styles.navItem}>
              <Button
                label={data.new_assessment}
                size={`small`}
                onClick={() => openAssessmentModal()}
              />
            </li>
          )}

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

          {!user && (
            <li className={styles.navItem}>
              <Button
                label={data.log_in}
                href={`/api/auth/login?lang=${locale}`}
                color={`black`}
                size={`small`}
              />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
