'use client';

import { CommonTranslationsDocument } from '@prismicio-types';
import { createContext, PropsWithChildren, useContext } from 'react';

interface ContentContextI {
  commonTranslations?: CommonTranslationsDocument<string>;
}

export const ContentContext = createContext<ContentContextI>({
  commonTranslations: undefined,
});

interface ContentContextProviderProps extends PropsWithChildren {
  commonTranslations: CommonTranslationsDocument<string>;
}

export const ContentContextProvider = ({
  children,
  commonTranslations,
}: ContentContextProviderProps) => {
  return (
    <ContentContext.Provider
      value={{
        commonTranslations,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const value = useContext(ContentContext);

  if (!value) throw new Error('Got undefined content context!');

  return value;
};
