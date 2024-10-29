import React from 'react';
import styles from './footer.module.scss';
import { FooterDocument } from '@prismicio-types';
import { PrismicNextImage } from '@prismicio/next';

interface FooterI extends FooterDocument {}

export const Footer = ({ data }: FooterI) => {
  if (!data) return <div></div>;
  const { logo_gmv, logo_sdsn } = data;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <PrismicNextImage width="200" height="62" field={logo_gmv} />
          <PrismicNextImage width="129" height="61" field={logo_sdsn} />
        </div>
      </div>
    </div>
  );
};
