import { Footer, Header, LanguageSwitch } from '@components';
import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';

export default async function StandardPage({
  params,
}: {
  params: { locale: string; uid: string };
}) {
  const client = createClient();
  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const page = await client.getByUID('standard_page', params.uid, {
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
      <div className="page__header">
        <Header doc={header}>
          {header.data.choose_language && (
            <li className="mx-3 last-of-type:mr-0">
              <LanguageSwitch
                label={header.data.choose_language as string}
                locales={locales}
              />
            </li>
          )}
        </Header>
      </div>
      <div className="page page--white">
        <div className="page__content page__content--width-8">
          {page.data.title && (
            <h1 className="text-2xl md:text-[40px]">
              {page.data.title[0]?.text}
            </h1>
          )}
          {page?.data?.preamble && (
            <div className={`page__preamble`}>
              {<PrismicRichText field={page.data.preamble} />}
            </div>
          )}
          {page?.data.body && <PrismicRichText field={page.data.body} />}
        </div>
      </div>
      <Footer {...footer} />
    </>
  );
}
