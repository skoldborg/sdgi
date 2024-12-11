import { GoalHero, Grid, TargetBar } from '@/app/components';
import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { GoalImpactForm } from './GoalImpactForm';

const GoalPage = async ({
  params,
}: {
  params: { locale: string; url_alias: string; _id: string; goal_id: string };
}) => {
  const client = createClient();
  const goalsDoc = await client.getSingle('goals', {
    lang: params.locale,
  });
  const goalPageDoc = await client.getSingle('goal_page', {
    lang: params.locale,
  });
  const commonTranslations = await client.getSingle('common_translations', {
    lang: params.locale,
  });

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
        goal_id={Number(goal_id)}
        backBtnLabel={
          commonTranslations.data.button_labels[0]?.back_to_assessment_board ??
          'Back'
        }
        assessmentGoalsUrl={`/${params.locale}/tool/assessment/${params.url_alias}`}
      />
      <div className="goal">
        <div className="bg-gray-light pt-4 md:pt-16">
          <div className="max-w-6xl mx-auto pb-6 md:pb-17 px-3 md:px-6">
            <h3 className="text-3xl mb-6 uppercase">{intro_title}</h3>
            <p className="text-base md:text-lg mb-10 max-w-screen-md">
              {intro_body}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 md:pt-20 pb-6 md:pb-27 px-3 md:px-6 bg-white">
          <h2 className="text-4xl mb-6 uppercase">Targets</h2>
          <div className="text-xl mb-6 md:mb-16">
            {targets_preamble && <PrismicRichText field={targets_preamble} />}
          </div>

          {targetComponents && <Grid cols={2} items={targetComponents} />}
        </div>

        <div className="bg-gray-light pt-4 md:pt-16">
          <div className="max-w-6xl mx-auto pb-6 md:pb-27 px-3 md:px-6">
            <GoalImpactForm
              goalId={goal_id}
              assessmentId={params._id}
              {...goalPageDoc}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalPage;
