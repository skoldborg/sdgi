import {
  Button,
  Header,
  LanguageSwitch,
  LoadingIndicator,
} from '@/app/components';
import { createClient } from '@/prismicio';
import headerStyles from '@/app/components/Header/header.module.scss';
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
      <div className="page__content">
        {resultPage && commonTranslations ? (
          <>
            <div className="section section--white">
              <Link
                href={`/${params.locale}/tool/assessment/${params.url_alias}`}
              >
                <Button
                  size="small"
                  label={
                    commonTranslations.data.button_labels[0]
                      ?.back_to_assessment_board ?? 'Back to assessment board'
                  }
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

            <AssessmentDetailsSection
              title={resultPage.data.print_description_title ?? 'Description'}
              {...resultPage}
            />

            <GoalPrintSection
              {...goalPage}
              goalsDoc={goalsDoc}
              printButtonLabel={resultPage.data.print_button_label ?? 'Print'}
            />
          </>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </>
  );
};

export default AssessmentGoalsPage;
