import { GoalHero, Grid, TargetBar } from '@/app/components';
import Section from '@/app/components/Section';
import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { GoalImpactForm } from './GoalImpactForm';

const GoalPage = async ({
  params,
}: {
  params: { locale: string; url_alias: string; _id: string; goal_id: string };
}) => {
  const client = createClient();
  const goalsDoc = await client.getSingle('goals');
  const goalPageDoc = await client.getSingle('goal_page');
  const commonTranslations = await client.getSingle('common_translations');

  // Extract content for current goal
  const goalContent = goalsDoc.data.body.find(
    (goal) => goal.primary.id === parseInt(params.goal_id),
  );
  if (!goalContent?.primary) {
    return <div></div>;
  }

  const { intro_title, intro_body, targets_preamble } = goalContent.primary;

  // Render each target
  const { goal_id } = params;
  const targetComponents = goalContent.items.map((target) => {
    const imageUrl = `/images/goals-targets/goal-${goal_id}/GOAL_${goal_id}_TARGETS/GOAL_${goal_id}_TARGETS_SVG/GOAL_${goal_id}_TARGET_${target.target_id}.svg`;
    return (
      <TargetBar
        key={target.target_id}
        title={target.target_title ?? ''}
        description={target.target_description ?? ''}
        imageUrl={imageUrl ?? ''}
      />
    );
  });

  return (
    <>
      <GoalHero
        title={goalContent.primary.title ?? ''}
        description={goalContent.primary.description ?? ''}
        goal_id={goal_id}
        backBtnLabel={
          commonTranslations.data.button_labels[0]?.back_to_assessment_board ??
          'Back'
        }
        assessmentGoalsUrl={`/${params.locale}/tool/assessment/${params.url_alias}`}
      />
      <div className="page__content">
        <div className="goal">
          <Section title={intro_title ?? ''} description={intro_body ?? ''} />

          <div className="section section--white">
            <h2 className={`section__title`}>Targets</h2>
            <div className="section__preamble">
              {targets_preamble && <PrismicRichText field={targets_preamble} />}
            </div>

            {targetComponents && <Grid cols={2} items={targetComponents} />}
          </div>

          <GoalImpactForm
            goalId={goal_id}
            assessmentId={params._id}
            commonTranslations={commonTranslations}
            {...goalPageDoc}
          />
        </div>
      </div>
    </>
  );
};

export default GoalPage;
