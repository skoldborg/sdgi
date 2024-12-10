import {
  AssessmentSummary,
  Header,
  LanguageSwitch,
  LoadingIndicator,
} from '@/app/components';
import { createClient } from '@/prismicio';
import { Goals } from './Goals';

const AssessmentGoalsPage = async ({
  params,
}: {
  params: { locale: string; uid: string };
}) => {
  const client = createClient();

  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const header = await client.getSingle('header', {
    lang: params.locale,
  });
  const goals = await client.getSingle('goals', {
    lang: params.locale,
  });
  const goalsPage = await client.getSingle('assessment_goals_page', {
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
      <div className="page__content">
        {goals && goalsPage ? (
          <>
            <Goals {...goalsPage} goalsDoc={goals} />
            <AssessmentSummary doc={goalsPage.data.summary} />
          </>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </>
  );
};

export default AssessmentGoalsPage;
