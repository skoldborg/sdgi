import React, { PropsWithChildren } from 'react';

import { TargetBar, Accordion } from '..';
import { Goal } from '@/@types/codegen/types';
import { GoalsDocumentDataBodyGoalSlice } from '@prismicio-types';

interface GoalQuickviewI extends PropsWithChildren {
  goal: Goal;
  goalContent: GoalsDocumentDataBodyGoalSlice;
  accordionOpenLabel: string;
  accordionCloseLabel: string;
  motivationTitle: string;
}

export const GoalQuickview = ({
  goal,
  goalContent,
  accordionCloseLabel,
  accordionOpenLabel,
  motivationTitle,
  children,
}: GoalQuickviewI) => {
  const { motivation } = goal;
  const { items } = goalContent;
  const { id } = goalContent.primary;

  const targetComponents = items.map((target) => {
    const imageUrl = `/images/goals-targets/goal-${id}/GOAL_${id}_TARGETS/GOAL_${id}_TARGETS_SVG/GOAL_${id}_TARGET_${target.target_id}.svg`;
    return (
      <TargetBar
        key={target.target_id}
        title={target.target_title ?? ''}
        description={target.target_description ?? ''}
        imageUrl={imageUrl}
        imageWidth={60}
        imageHeight={90}
        size="small"
      />
    );
  });

  return (
    <div className="p-6 text-black md:py-10 md:px-8">
      <div className="pb-12">
        <Accordion
          openLabel={accordionOpenLabel}
          closeLabel={accordionCloseLabel}
          id={Number(id)}
        >
          {targetComponents}
        </Accordion>
      </div>

      {children}

      <div className="pb-12">
        <h2 className="text-lg mb-6 md:text-2xl">{motivationTitle}</h2>
        <p className="text-base leading-7">{motivation}</p>
      </div>
    </div>
  );
};
