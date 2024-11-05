import { GoalHero, LoadingIndicator } from '@/app/components';
import { createClient } from '@/prismicio';
import { GoalRelevanceBar } from './GoalRelevanceBar/GoalRelevanceBar';

const AssessmentGoalsPage = async ({
  params,
}: {
  params: { locale: string; goal_id: string; _id: string };
}) => {
  const client = createClient();

  const goalsDoc = await client.getSingle('goals', {
    lang: params.locale,
  });
  const assessmentGoalsPage = await client.getSingle('assessment_goals_page', {
    lang: params.locale,
  });
  const goalContent = goalsDoc.data.body.find(
    (goal) => goal.primary.id === parseInt(params.goal_id),
  );

  return (
    <>
      {goalContent ? (
        <>
          <GoalHero
            size="large"
            title={goalContent?.primary.title ?? ''}
            description={goalContent?.primary.description ?? ''}
            goal_id={Number(params.goal_id)}
          />
          <GoalRelevanceBar
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
