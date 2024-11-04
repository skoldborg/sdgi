import { Option, GoalCard } from '@components';
import './goal-print-box.scss';

import { GoalPageDocument, GoalsDocument } from '@prismicio-types';

interface GoalPrintBoxI extends GoalPageDocument {
  goal_id: string;
  motivation: string;
  impact: number;
  goalsDoc: GoalsDocument;
}

export const GoalPrintBox = ({
  data: page,
  goalsDoc,
  goal_id,
  motivation,
  impact,
}: GoalPrintBoxI) => {
  const goals = goalsDoc.data.body;
  const title = goals.find((goal) => goal.id === goal_id)?.primary.title ?? '';
  const description =
    goals.find((goal) => goal.id === goal_id)?.primary.description ?? '';

  const titles = title.split('--');
  let formattedTitle = '';
  let impactLabel = '';
  titles.forEach((title) => (formattedTitle += title));

  page.impact_options.forEach((option) => {
    if (impact === option.value) {
      impactLabel = option.label ?? '';
    } else if (impact === 0) {
      impactLabel = page?.impact_options[5]?.label ?? '';
    }
  });

  return (
    <div className="goal-print-box">
      <div className="goal-print-box__header">
        <div
          className={`goal-print-box__goal-id goal-print-box__goal-id--${goal_id}`}
        >
          <GoalCard title={title} goal_id={Number(goal_id)} saved />
        </div>
        <div className="goal-print-box__header-content">
          <h2 className="goal-print-box__title">{formattedTitle}</h2>
          <p className="goal-print-box__description">{description}</p>
        </div>
      </div>

      <div className="goal-print-box__content">
        <div className="goal-print-box__content-box">
          <h3 className="goal-print-box__content-title">Impact</h3>
          <Option label={impactLabel} type={`locked`} />
        </div>
        <div className="goal-print-box__content-box">
          <h3 className="goal-print-box__content-title">Motivation</h3>
          <p className="goal-print-box__content-text">{motivation}</p>
        </div>
      </div>
    </div>
  );
};
