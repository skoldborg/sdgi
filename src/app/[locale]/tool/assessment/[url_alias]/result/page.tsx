import {
  Button,
  Header,
  LanguageSwitch,
  LoadingIndicator,
} from '@/app/components';
import { createClient } from '@/prismicio';
import Link from 'next/link';
import Image from 'next/image';
import { ResultGraph } from './ResultGraph';
import { AssessmentDetailsSection } from './AssessmentDetailsSection';
import { GoalPrintSection } from './GoalPrintSection';

const AssessmentGoalsPage = async ({
  params,
}: {
  params: { locale: string; url_alias: string };
}) => {
  const client = createClient();

  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const header = await client.getSingle('header', {
    lang: params.locale,
  });
  const resultPage = await client.getSingle('result_page', {
    lang: params.locale,
  });
  const goalPage = await client.getSingle('goal_page', {
    lang: params.locale,
  });
  const goalsDoc = await client.getSingle('goals', {
    lang: params.locale,
  });
  const commonTranslations = await client.getSingle('common_translations', {
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
        </Header>
      </div>
      <div>
        <div className="pt-4 md:pt-16">
          {resultPage && commonTranslations ? (
            <>
              <div className="max-w-6xl mx-auto pb-6 md:pb-17 px-3 md:px-6">
                <Link
                  href={`/${params.locale}/tool/assessment/${params.url_alias}`}
                >
                  <Button
                    size="small"
                    label={
                      commonTranslations.data.button_labels[0]
                        ?.back_to_assessment_board ?? 'Back to assessment board'
                    }
                    className="mb-6 print:hidden"
                  />
                </Link>
                <div className="print-only print-only-logo">
                  <Image
                    src="/images/siat-logo.svg"
                    alt=""
                    width="200"
                    height="32"
                  />
                </div>

                <ResultGraph
                  {...goalPage}
                  goalsDoc={goalsDoc}
                  resultPage={resultPage}
                />
              </div>

              <div className="bg-gray-light print:bg-white pb-16 pt-4 md:pt-16 px-3 md:px-6">
                <AssessmentDetailsSection
                  title={
                    resultPage.data.print_description_title ?? 'Description'
                  }
                  {...resultPage}
                />

                <GoalPrintSection
                  {...goalPage}
                  goalsDoc={goalsDoc}
                  printButtonLabel={
                    resultPage.data.print_button_label ?? 'Print'
                  }
                />
              </div>
            </>
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    </>
  );
};

export default AssessmentGoalsPage;
