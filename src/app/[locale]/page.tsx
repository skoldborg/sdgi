import Hero from '../components/Hero';
import styles from './page.module.css';
import { client } from '@/prismic-client';

export default async function Home({ params }: { params: { locale: string } }) {
  // const { user, error, isLoading } = useUser();

  const page = await client.getSingle('startpage');

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // if (user) {
  //   return (
  //     <div>
  //       Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
  //     </div>
  //   );
  // }
  return (
    <div className={styles.page}>
      <Hero locale={params.locale} {...page} />
    </div>
  );
}
