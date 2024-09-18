import React from 'react';
import './hero.scss';

import { PrismicRichText } from '@prismicio/react';
import { StartpageDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Button from '../Button';

interface HeroI extends StartpageDocument {
  locale: string;
}

export default async function Hero({ locale, data }: HeroI) {
  return (
    <>
      <div className={`hero`}>
        {data.hero_image && (
          <PrismicNextImage field={data.hero_image} className={`hero__image`} />
        )}
        <div className={`hero__content`}>
          <div className={`hero__title`}>
            <PrismicRichText field={data.title} />
          </div>
          <div className={`hero__button`}>
            <Button
              label={data.button_label}
              color={`white`}
              href={`/api/auth/login?lang=${locale}`}
            />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
