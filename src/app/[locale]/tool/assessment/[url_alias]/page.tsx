import {
  AssessmentSummary,
  Header,
  LanguageSwitch,
  LoadingIndicator,
} from '@/app/components';
import { createClient } from '@/prismicio';
import headerStyles from '@/app/components/Header/header.module.scss';
import { Goals } from './Goals';

const AssessmentGoalsPage = async () => {
  const client = createClient();

  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const header = await client.getSingle('header');
  const goals = await client.getSingle('goals');
  const goalsPage = await client.getSingle('assessment_goals_page');

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
