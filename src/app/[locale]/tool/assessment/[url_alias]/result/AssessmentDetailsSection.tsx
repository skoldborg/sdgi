'use client';

import {
  useAddOrUpdateAssessmentStrategyMutation,
  useGetAssessmentQuery,
} from '@/app/[locale]/queries.generated';
import { Form } from '@/app/components';
import Section from '@/app/components/Section';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ResultPageDocument } from '@prismicio-types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AssessmentDetailsSectionI extends ResultPageDocument {
  title: string;
}

export const AssessmentDetailsSection = ({
  title,
  data: page,
}: AssessmentDetailsSectionI) => {
  const { user } = useUser();
  const params = useParams<{ locale: string; url_alias: string }>();

  const { data: assessment, loading } = useGetAssessmentQuery({
    variables: {
      userId: user?.sub,
      urlAlias: decodeURI(params.url_alias),
    },
    skip: !user?.sub || !params.url_alias,
  });

  const [strategy, setStrategy] = useState(
    assessment?.getAssessment?.strategy?.strategy ?? '',
  );
  const [questions, setQuestions] =
    useState<{ id: string; checked: boolean }[]>();

  const [updateAssessmentStrategy, { error }] =
    useAddOrUpdateAssessmentStrategyMutation();

  useEffect(() => {
    // Check for valid conditions outside the main hook logic
    if (
      !assessment?.getAssessment?.strategy?.questions ||
      !page.strategy_questions
    ) {
      return;
    }

    const questionsArr = page.strategy_questions.reduce(
      (acc, q) => {
        const savedQuestions = assessment.getAssessment?.strategy?.questions;
        const checked =
          savedQuestions?.find((savedQ) => savedQ?.id === q.id)?.checked ??
          false;

        return [
          ...acc,
          {
            id: q.id ?? '',
            checked,
          },
        ];
      },
      [] as { id: string; checked: boolean }[],
    );

    setQuestions(questionsArr);

    // Add all necessary dependencies
  }, [assessment?.getAssessment?.strategy?.questions, page.strategy_questions]);

  if (!assessment || loading) return;

  return (
    <>
      <Section
        title={title}
        description={assessment.getAssessment?.description ?? ''}
        print={true}
      />

      <div className="section">
        <div className="section__inner">
          <h2 className="section__title section__title--centered section__title--lowercase">
            {page.strategy_title}
          </h2>
          <p className="section__description">{page.strategy_description}</p>

          <Form
            error={error?.message && error.message !== '' ? true : false}
            success={!loading && !error}
            message={error?.message ?? ''}
            onSubmit={() => {
              updateAssessmentStrategy({
                variables: {
                  assessmentId: assessment.getAssessment?._id,
                  strategy,
                  questions,
                },
              });
            }}
          >
            {page.strategy_questions &&
              questions !== undefined &&
              page.strategy_questions.map((q) => {
                return (
                  <Form.Checkbox
                    key={q.id}
                    id={q.id ?? ''}
                    label={q.label ?? ''}
                    defaultChecked={
                      questions.find((refQ) => refQ.id === q.id)?.checked
                    }
                    onChange={(e) => {
                      setQuestions(
                        questions.map((q) => {
                          if (q.id === e.target.id) {
                            return {
                              id: q.id ?? '',
                              checked: e.target.checked,
                            };
                          } else {
                            return q;
                          }
                        }),
                      );
                    }}
                  />
                );
              })}
            <Form.TextArea
              id="strategy"
              label=""
              hiddenLabel
              placeholder={page.motivation_placeholder ?? ''}
              defaultValue={assessment?.getAssessment?.strategy?.strategy}
              onChange={(e) => setStrategy(e.target.value)}
              maxLength={4000}
            />
            <Form.Submit
              label={page.save_motivation_label ?? ''}
              modifier="slim"
            />
          </Form>

          {/* Only for print below */}
          {strategy && (
            <Section
              title={page.strategy_title_print ?? ''}
              description={strategy}
              print={true}
            />
          )}
        </div>
      </div>
    </>
  );
};
