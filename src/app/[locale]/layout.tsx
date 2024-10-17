import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@fontsource/open-sans-condensed/700.css';
import '../styles/base.scss';
import { Header, LanguageSwitch, Modal, ModalProvider } from '@components';
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
              <ModalProvider>
                <Modal />

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
              </ModalProvider>
            </UIContextProvider>
          </UserProvider>
        </ApolloWrapper>

        <svg
          className="icon-sprite"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <symbol id="icon-logo" viewBox="0 0 30 30">
            <path
              d="M17.3,13.5c-0.2-0.2-0.4-0.3-0.6-0.3c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0.1-0.2,0.1
        	c-0.1,0-0.1,0.1-0.1,0.2s0,0.2,0,0.3c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.1,0.3,0.2
        	c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.2,0.2,0.2,0.3s0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.3,0.4S17.1,17,17,17.1
        	s-0.3,0.1-0.5,0.1c-0.2,0-0.5,0-0.7-0.1s-0.4-0.2-0.5-0.4l0.4-0.5c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.3,0.1,0.4,0.1
        	c0.2,0,0.3-0.1,0.4-0.2s0.2-0.3,0.2-0.4c0-0.2-0.1-0.3-0.2-0.4c-0.1-0.1-0.3-0.2-0.5-0.3c-0.1-0.1-0.2-0.1-0.3-0.2
        	c-0.1-0.1-0.2-0.2-0.3-0.2s-0.1-0.2-0.2-0.3c0-0.1-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.6s0.2-0.3,0.3-0.4c0.1-0.1,0.2-0.2,0.4-0.2
        	c0.1-0.1,0.3-0.1,0.4-0.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.2,0.4,0.3L17.3,13.5z M18.4,17v-4.3h0.7V17H18.4z M21.9,17l-0.2-0.9
        	h-1.1L20.3,17h-0.7l1.1-4.3h0.9l1.1,4.3H21.9z M21.1,13.4L21.1,13.4l-0.5,2.1h1L21.1,13.4z M24.2,13.3V17h-0.7v-3.7h-0.8v-0.6H25
        	v0.6H24.2z"
            />
            <path
              d="M6.6,14.1c0.1-0.1,0.2-0.2,0.3-0.4l-0.9-1c-0.2,0.2-0.4,0.5-0.6,0.7L6.6,14.1 M8.8,13.4
        	c0.1,0.1,0.3,0.1,0.4,0.2l0.9-1c-0.2-0.2-0.5-0.4-0.8-0.5L8.8,13.4 M10.8,13.7l-1.2,0.6c0.1,0.1,0.1,0.3,0.1,0.4l1.3-0.1
        	C11.1,14.3,11,14,10.8,13.7 M9.6,14.1l1.2-0.6c-0.1-0.3-0.3-0.5-0.6-0.7l-0.9,1C9.4,13.9,9.5,14,9.6,14.1 M6.3,15
        	C6.3,15,6.3,14.9,6.3,15L5,14.8c0,0.1,0,0.1,0,0.2c0,0.3,0,0.5,0.1,0.7l1.3-0.4C6.3,15.3,6.3,15.1,6.3,15 M9.4,16.1
        	c-0.1,0.1-0.2,0.2-0.3,0.3l0.7,1.1c0.3-0.2,0.5-0.4,0.7-0.6L9.4,16.1 M9.8,15c0,0.1,0,0.2,0,0.4l1.3,0.4c0.1-0.2,0.1-0.5,0.1-0.7
        	c0-0.1,0-0.1,0-0.2L9.8,15C9.8,15,9.8,15,9.8,15 M6.7,16.1l-1.1,0.8c0.2,0.2,0.4,0.5,0.7,0.6l0.7-1.1C7,16.3,6.8,16.2,6.7,16.1
        	 M6.4,14.7c0-0.2,0.1-0.3,0.1-0.4l-1.2-0.6C5.2,14,5.1,14.3,5,14.6L6.4,14.7 M9.6,17.6l-0.7-1.1c-0.1,0.1-0.3,0.1-0.4,0.2L8.7,18
        	C9.1,17.9,9.3,17.8,9.6,17.6 M9.7,15.6c0,0.1-0.1,0.3-0.2,0.4l1.1,0.8c0.2-0.2,0.3-0.5,0.4-0.8L9.7,15.6 M8.3,16.7
        	c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1,0-0.2,0L7.6,18c0.1,0,0.3,0,0.4,0c0.2,0,0.3,0,0.5,0L8.3,16.7 M8.2,13.3c0.1,0,0.3,0,0.4,0.1
        	l0.5-1.2C8.8,12,8.5,12,8.2,11.9V13.3 M7.7,16.7c-0.1,0-0.3-0.1-0.4-0.2l-0.7,1.1c0.3,0.2,0.6,0.3,0.9,0.3L7.7,16.7 M7.5,13.4
        	c0.1,0,0.3-0.1,0.4-0.1v-1.3c-0.3,0-0.6,0.1-0.9,0.2L7.5,13.4 M6.6,16c-0.1-0.1-0.2-0.3-0.2-0.4l-1.3,0.4c0.1,0.3,0.2,0.6,0.4,0.8
        	L6.6,16 M7,13.6c0.1-0.1,0.2-0.2,0.4-0.2l-0.5-1.2c-0.3,0.1-0.6,0.3-0.8,0.5L7,13.6"
            />
          </symbol>

          <symbol id="icon-close" viewBox="0 0 30 30">
            <path
              d="M24.5,22.4c0.6,0.6,0.6,1.5,0,2.1c-0.6,0.6-1.5,0.6-2.1,0c0,0,0,0,0,0L15,17.1l-7.4,7.4
			c-0.6,0.6-1.5,0.6-2.1,0c-0.6-0.6-0.6-1.5,0-2.1l7.4-7.4L5.4,7.6C4.9,7,4.9,6,5.4,5.4C6,4.9,7,4.9,7.6,5.4l7.4,7.4l7.4-7.4
			c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c0,0,0,0,0,0L17.1,15L24.5,22.4z"
            />
          </symbol>

          <symbol id="icon-check" viewBox="0 0 30 30">
            <polygon points="22.9,7.9 25,10 13.1,22.1 5,16.7 6.7,14.2 12.7,18.2 " />
          </symbol>

          <symbol id="icon-magnifier" viewBox="0 0 30 30">
            <path d="M19.67,20.03c-3.16,3.4-8.3,3.4-11.46,0s-3.16-8.92,0-12.33s8.3-3.4,11.46,0C22.84,11.1,22.84,16.62,19.67,20.03z M9.49,9.07c-2.46,2.65-2.46,6.94,0,9.59s6.45,2.65,8.91,0s2.46-6.94,0-9.59S11.95,6.42,9.49,9.07z M23.9,23.2c0.35,0.38,0.35,0.99,0,1.37c-0.35,0.38-0.92,0.38-1.27,0l-3.92-4.21c-0.35-0.38-0.35-0.99,0-1.37c0.35-0.38,0.92-0.38,1.27,0L23.9,23.2z" />
          </symbol>

          <symbol id="icon-print" viewBox="0 0 30 30">
            <path
              id="Shape"
              d="M22,11H8c-1.66,0-3,1.34-3,3v6h4v4h12v-4h4v-6C25,12.34,23.66,11,22,11z M19,22h-8v-5h8V22z M22,15c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S22.55,15,22,15z M21,6H9v4h12V6z"
            />
          </symbol>

          <symbol id="icon-edit" viewBox="0 0 30 30">
            <path
              d="M7.5,19.4v3.1h3.1l9.2-9.2l-3.1-3.1L7.5,19.4z M22.3,10.9c0.3-0.3,0.3-0.8,0-1.2c0,0,0,0,0,0l-2-1.9c-0.3-0.3-0.8-0.3-1.2,0
			c0,0,0,0,0,0l-1.5,1.5l3.1,3.1C20.7,12.4,22.3,10.9,22.3,10.9z"
            />
          </symbol>
        </svg>
      </body>
    </html>
  );
}
