import React from 'react';
import './hero.scss';

import { PrismicRichText } from '@prismicio/react';
import { StartpageDocument } from '@prismicio-types';
import { PrismicNextImage } from '@prismicio/next';

import { Button } from '@components';

interface HeroI extends StartpageDocument {
  locale: string;
}

export const Hero = ({ locale, data: page }: HeroI) => {
  return (
    <>
      <div className={`hero`}>
        {page.hero_image && (
          <PrismicNextImage field={page.hero_image} className={`hero__image`} />
        )}
        <div className={`hero__content`}>
          <div className={`hero__title`}>
            <PrismicRichText field={page.title} />
          </div>
          <div className={`hero__button`}>
            <Button
              label={page.button_label}
              color={`white`}
              href={`/api/auth/login?lang=${locale}`}
            />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
