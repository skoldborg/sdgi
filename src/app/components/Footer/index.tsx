import React from 'react';
import { FooterDocument } from '@prismicio-types';
import { PrismicNextImage } from '@prismicio/next';

interface FooterI extends FooterDocument {}

export const Footer = ({ data }: FooterI) => {
  if (!data) return <div></div>;
  const { logo_gmv, logo_sdsn } = data;

  return (
    <div className="bottom-0 w-full flex bg-white border-1 border-solid border-gray-light justify-center self-center">
      <div className="flex flex-col h-full w-full max-w-6xl py-7 px-3 lg:px-6">
        <div className="w-full flex flex-col justify-between gap-x-4 md:flex-row">
          <PrismicNextImage width="200" height="62" field={logo_gmv} />
          <PrismicNextImage width="129" height="61" field={logo_sdsn} />
        </div>
      </div>
    </div>
  );
};
