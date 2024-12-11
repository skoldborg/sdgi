import { Footer, Header, LanguageSwitch } from '@components';
import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';

type IframeEmbedField = {
  type: string;
  text: string;
};

export default async function ResourcesPage({
  params,
}: {
  params: { locale: string; uid: string };
}) {
  const client = createClient();
  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);

  const page = await client.getSingle('resources', {
    lang: params.locale,
  });
  const header = await client.getSingle('header', {
    lang: params.locale,
  });
  const footer = await client.getSingle('footer', {
    lang: params.locale,
  });

  const iframeEmbed = page?.data?.iframe_embed[0] as IframeEmbedField;

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
        </Header>
      </div>
      <div className="relative bg-white overflow-x-hidden">
        <div className="px-3 pt-4 max-w-3xl min-h-screen mx-auto md:py-16 md:px-6">
          {page.data.title && (
            <h1 className="text-2xl md:text-5xl mb-6 md:mb-10">
              {page.data.title[0]?.text}
            </h1>
          )}
          {page?.data?.preamble && (
            <div className="text-[22px] mb-6 last-child:mb-0 [&>a]:text-black [&>a]:underline [&>a]:hover:no-underline">
              {<PrismicRichText field={page.data.preamble} />}
            </div>
          )}
          <div className="rte">
            {page?.data.body && <PrismicRichText field={page.data.body} />}
          </div>

          {iframeEmbed && iframeEmbed.text !== '' && (
            <div
              className="iframe-embed"
              dangerouslySetInnerHTML={{
                __html: iframeEmbed.text,
              }}
            />
          )}
        </div>
      </div>
      <Footer {...footer} />
    </>
  );
}
