import React from 'react';

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
      <div className="h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] w-full relative flex flex-col bg-black items-center">
        {page.hero_image && (
          <PrismicNextImage
            field={page.hero_image}
            className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-60"
          />
        )}
        <div className="relative z-10 m-auto text-center max-w-[600px] px-4">
          <div className="text-4xl md:text-6xl uppercase text-white mb-6">
            <PrismicRichText field={page.title} />
          </div>
          <Button
            label={page.button_label}
            color={`white`}
            href={`/api/auth/login?lang=${locale}`}
            className="mt-4"
          />
        </div>
      </div>
    </>
  );
};
