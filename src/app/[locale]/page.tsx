import { Button, Header, Hero, LanguageSwitch } from '@components';
import headerStyles from '@/app/components/Header/header.module.scss';
import styles from './page.module.css';
import { createClient } from '@/prismicio';

export default async function Home({ params }: { params: { locale: string } }) {
  const client = createClient();
  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const page = await client.getSingle('startpage');
  const header = await client.getSingle('header');

  return (
    <>
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
          <li className={styles.navItem}>
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
    </>
  );
}
