import { Button, Footer, Header, Hero, LanguageSwitch } from '@components';
import styles from './page.module.css';
import { createClient } from '@/prismicio';

export default async function Home({ params }: { params: { locale: string } }) {
  const client = createClient();
  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const page = await client.getSingle('startpage', {
    lang: params.locale,
  });
  const header = await client.getSingle('header', {
    lang: params.locale,
  });
  const footer = await client.getSingle('footer', {
    lang: params.locale,
  });

  return (
    <>
      <div className="page-header">
        <Header doc={header}>
          {header.data.choose_language && (
            <li className="mx-3 last-of-type:mr-0">
              <LanguageSwitch
                label={header.data.choose_language as string}
                locales={locales}
              />
            </li>
          )}
          <li className="mx-3 last-of-type:mr-0">
            <Button
              label={header.data.log_in}
              href={`/api/auth/login?lang=${params.locale}`}
              color={`black`}
              size={`small`}
            />
          </li>
        </Header>
      </div>
      <div className={styles.page}>
        <Hero locale={params.locale} {...page} />
      </div>
      <Footer {...footer} />
    </>
  );
}
