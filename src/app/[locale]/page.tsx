import { Hero } from '@components';
import styles from './page.module.css';
import { createClient } from '@/prismicio';

export default async function Home({ params }: { params: { locale: string } }) {
  const client = createClient();
  const page = await client.getSingle('startpage');

  return (
    <div className={styles.page}>
      <Hero locale={params.locale} {...page} />
    </div>
  );
}
