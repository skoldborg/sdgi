import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@fontsource/open-sans-condensed/700.css';
import '../styles/global.css';
import { IconSprite, Modal, ModalProvider } from '@components';
import { UIContextProvider } from '../contexts/ui-context';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { ContentContextProvider } from '../contexts/content-context';
import { createClient } from '@/prismicio';

export const metadata: Metadata = {
  title: 'SDG Impact Assessment Tool',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const client = createClient();
  const commonTranslations = await client.getSingle('common_translations', {
    lang: params.locale,
  });

  return (
    <html lang={params.locale ?? 'en-gb'} translate="no">
      <body suppressHydrationWarning={true} className="page">
        <ApolloWrapper>
          <UserProvider>
            <ContentContextProvider commonTranslations={commonTranslations}>
              <UIContextProvider>
                <ModalProvider>
                  <Modal />

                  {children}
                </ModalProvider>
              </UIContextProvider>
            </ContentContextProvider>
          </UserProvider>
        </ApolloWrapper>

        <IconSprite />
      </body>
    </html>
  );
}
