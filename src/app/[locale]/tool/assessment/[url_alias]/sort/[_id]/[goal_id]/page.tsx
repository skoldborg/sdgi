import { GoalHero, LoadingIndicator } from '@/app/components';
import { createClient } from '@/prismicio';
import { GoalRelevanceBar } from './GoalRelevanceBar/GoalRelevanceBar';

const AssessmentGoalsPage = async ({
  params,
}: {
  params: { locale: string; goal_id: string; _id: string };
}) => {
  const client = createClient();

  const goalsDoc = await client.getSingle('goals');
  const assessmentGoalsPage = await client.getSingle('assessment_goals_page');
  const goalContent = goalsDoc.data.body.find(
    (goal) => goal.primary.id === parseInt(params.goal_id),
  );

  const commonTranslations = await client.getSingle('common_translations');

  return (
    <>
      {goalContent ? (
        <>
          <GoalHero
            size="large"
            title={goalContent?.primary.title ?? ''}
            description={goalContent?.primary.description ?? ''}
            goal_id={params.goal_id}
          />
          <GoalRelevanceBar
            commonTranslations={commonTranslations}
            goalPriorities={assessmentGoalsPage.data.goal_priorities}
          />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default AssessmentGoalsPage;
