import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@fontsource/open-sans-condensed/700.css';
import '../styles/globals.scss';
import { Header, LanguageSwitch } from '@components';
import headerStyles from '../components/Header/header.module.scss';
import { createClient } from '@/prismicio';
import { UIContextProvider } from '../contexts/ui-context';
import { ApolloWrapper } from '@/lib/apollo-wrapper';

export const metadata: Metadata = {
  title: 'SDG Impact Assessment Tool',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const header = await client.getSingle('header');

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ApolloWrapper>
          <UserProvider>
            <UIContextProvider>
              <div className="page__header">
                <Header doc={header}>
                  {header.data.choose_language && (
                    <li className={headerStyles.navItem}>
                      <LanguageSwitch
                        label={header.data.choose_language as string}
                        locales={locales}
                      />
                    </li>
                  )}
                </Header>
              </div>
              {children}
            </UIContextProvider>
          </UserProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
