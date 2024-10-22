'use client';

import { useGetAssessmentGoalQuery } from '@/app/[locale]/queries.generated';
import { GoalPageDocument } from '../../../../../../../../prismicio-types';
import { OptionsBar } from '@/app/components';
import { useState } from 'react';

interface GoalImpactFormI extends GoalPageDocument {
  assessmentId: string;
  goalId: string;
}

export const GoalImpactForm = ({
  data: page,
  assessmentId,
  goalId,
}: GoalImpactFormI) => {
  const { data } = useGetAssessmentGoalQuery({
    variables: {
      id: assessmentId,
    },
    skip: !assessmentId,
  });

  const [impact, setImpact] = useState(data?.getAssessmentGoal?.impact);

  const impactOptions = page.impact_options.reduce(
    (acc, o) => {
      return [
        ...acc,
        {
          label: o.label ?? '',
          value: Number(o.value),
        },
      ];
    },
    [] as {
      label: string;
      value: number;
    }[],
  );

  return (
    <>
      <div className="section">
        <h2 className="section__title section__title--centered section__title--lowercase">
          {page.impact_title ?? 'How'} {goalId}?
        </h2>

        {page.impact_options && impact && (
          <OptionsBar
            options={impactOptions.slice(0, 5)}
            otherOption={impactOptions[5]}
            onChangeHandler={(impactRatingState) =>
              setImpact(impactRatingState)
            }
            initialState={impact}
          />
        )}
      </div>
      {/* <div className="section">
				<div className="section__inner">
					<h2 className="section__title section__title--centered section__title--lowercase">
						{page.motivation_field_title ?? "Motivate why"}
					</h2>
					<Form
						initialState={props.goal}
						fields={[
							{
								type: "textarea",
								value: motivation,
								required: true,
								id: "motivation",
								placeholder:
									page.motivation_field_placeholder ??
									"Max 3 000 characters",
								maxlength: 3000,
							},
						]}
						success={!updateGoalFailed}
						error={updateGoalFailed}
						message={updateGoalMsg}
						submit={{
							label:
								page.save_impact_assessment_label ??
								"Save assessment",
							handler: (e, formState) => updateGoal(e, formState),
						}}
						modifier={`centered`}
					/>
				</div>
      </div> */}
    </>
  );
};
