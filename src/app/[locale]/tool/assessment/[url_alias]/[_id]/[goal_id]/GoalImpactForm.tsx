'use client';

import {
  GetAssessmentGoalDocument,
  GetAssessmentsDocument,
  useGetAssessmentGoalQuery,
  useUpdateGoalMutation,
} from '@/app/[locale]/queries.generated';
import { Form, OptionsBar } from '@/app/components';
import { useEffect, useState } from 'react';
import { GoalPageDocument } from '@prismicio-types';
import { useRouter } from 'next/navigation';
import { useContentContext } from '@/app/contexts/content-context';
import { useUser } from '@auth0/nextjs-auth0/client';

interface GoalImpactFormI extends GoalPageDocument {
  assessmentId: string;
  goalId: string;
}

export const GoalImpactForm = ({
  data: page,
  assessmentId,
  goalId,
}: GoalImpactFormI) => {
  const user = useUser();
  const router = useRouter();

  const { commonTranslations } = useContentContext();

  const { data } = useGetAssessmentGoalQuery({
    variables: {
      id: assessmentId,
    },
    skip: !assessmentId,
  });

  const [impact, setImpact] = useState<undefined | number>();
  const [motivation, setMotivation] = useState<undefined | string>();

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

  useEffect(() => {
    if (data?.getAssessmentGoal) {
      if (typeof data?.getAssessmentGoal?.impact === 'number') {
        setImpact(data?.getAssessmentGoal?.impact);
      }

      if (data?.getAssessmentGoal.motivation)
        setMotivation(data?.getAssessmentGoal.motivation);
    }
  }, [data?.getAssessmentGoal]);

  const refetchQueries = [
    {
      query: GetAssessmentGoalDocument,
      variables: {
        id: assessmentId,
      },
      skip: !assessmentId,
    },
    {
      query: GetAssessmentsDocument,
      variables: {
        userId: user.user?.sub,
      },
      skip: !user.user?.sub,
    },
  ];

  const [updateGoal, { data: updateGoalData }] = useUpdateGoalMutation({
    variables: {
      id: assessmentId,
      input: {
        impact,
        motivation,
        saved: true,
      },
    },
    onError: () => {
      setHasSubmitError(true);
    },
    onCompleted: () => {
      setHasSubmitError(false), router.back();
    },
    awaitRefetchQueries: false,
    refetchQueries,
  });

  const errorMsgSaveAssessment =
    commonTranslations?.data.error_messages[0]?.save_assessment ??
    'Error when saving assessment';
  const errorMsgEmptyFields =
    commonTranslations?.data.error_messages[0]?.impact_validation ?? '';

  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(errorMsgSaveAssessment);

  return (
    <>
      <div className="section">
        <h2 className="section__title section__title--centered section__title--lowercase">
          {page.impact_title ?? 'How does your case impact SDG'} {goalId}?
        </h2>

        {page.impact_options && (
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
      <div className="section">
        <div className="section__inner">
          <h2 className="section__title section__title--centered section__title--lowercase">
            {page.motivation_field_title ?? 'Motivate why'}
          </h2>
          <Form
            success={!hasSubmitError && !!updateGoalData?.updateGoal}
            error={hasSubmitError}
            message={hasSubmitError ? errorMsg : ''}
            onSubmit={() => {
              if (typeof impact !== 'number' || motivation === '') {
                setErrorMsg(errorMsgEmptyFields);
                setHasSubmitError(true);
              } else {
                setHasSubmitError(false);
                updateGoal();
              }
            }}
          >
            <Form.TextArea
              id="motivation"
              label={page.motivation_field_title ?? 'Motivate why'}
              hiddenLabel
              placeholder={
                page.motivation_field_placeholder ?? 'Max 3 000 characters'
              }
              defaultValue={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              maxLength={3000}
              required
            />
            <Form.Submit
              label={page.save_impact_assessment_label ?? 'Save assessment'}
            />
          </Form>
        </div>
      </div>
    </>
  );
};
