'use client';

import {
  GetAssessmentDocument,
  useAddOrUpdateAssessmentStrategyMutation,
  useGetAssessmentQuery,
} from '@/app/[locale]/queries.generated';
import { Form } from '@/app/components';
import Section from '@/app/components/Section';
import { useContentContext } from '@/app/contexts/content-context';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ResultPageDocument } from '@prismicio-types';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface AssessmentDetailsSectionI extends ResultPageDocument {
  title: string;
}

export const AssessmentDetailsSection = ({
  title,
  data: page,
}: AssessmentDetailsSectionI) => {
  const { user } = useUser();
  const params = useParams<{ locale: string; url_alias: string }>();

  const { commonTranslations } = useContentContext();

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
  const [questions, setQuestions] = useState<
    { id: string; checked: boolean }[]
  >([]);

  const refetchQueries = [
    {
      query: GetAssessmentDocument,
      variables: {
        userId: user?.sub,
        urlAlias: decodeURI(params.url_alias),
      },
      skip: !user?.sub || !params.url_alias,
    },
  ];

  const [
    updateAssessmentStrategy,
    { error, loading: updateAssessmentLoading },
  ] = useAddOrUpdateAssessmentStrategyMutation({
    awaitRefetchQueries: true,
    refetchQueries,
  });

  const successMsg =
    commonTranslations?.data?.success_messages[0]?.save_assessment ??
    'Assessment has been updated';
  const errorMsg =
    commonTranslations?.data?.error_messages[0]?.save_assessment ??
    "Couldn't save assessment";
  const [assessmentStrategySubmitted, setAssessmentStrategySubmitted] =
    useState(false);
  const [assessmentStrategySubmitMsg, setAssessmentStrategySavedMsg] =
    useState('');

  // Build array of question checkbox data from `strategy_questions` content and saved questions
  const questionsArr = useMemo(() => {
    if (!loading && assessment?.getAssessment) {
      return page.strategy_questions.reduce(
        (acc, q) => {
          const savedQuestions = assessment?.getAssessment?.strategy?.questions;
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
    }
  }, [assessment?.getAssessment, page.strategy_questions, loading]);

  useEffect(() => {
    if (questionsArr) {
      setQuestions(questionsArr);
    }
  }, [questionsArr]);

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
            error={error !== undefined && error?.message !== ''}
            success={!loading && assessmentStrategySubmitted}
            message={assessmentStrategySubmitMsg}
            onSubmit={() => {
              updateAssessmentStrategy({
                variables: {
                  assessmentId: assessment.getAssessment?._id,
                  strategy,
                  questions,
                },
                onCompleted: () => {
                  setAssessmentStrategySubmitted(true);
                  setAssessmentStrategySavedMsg(successMsg);
                },
                onError: () => {
                  setAssessmentStrategySubmitted(true);
                  setAssessmentStrategySavedMsg(errorMsg);
                },
              });
            }}
          >
            {page.strategy_questions &&
              questions.length > 0 &&
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
              modifier="strategy"
              maxLength={4000}
            />
            <Form.Submit
              label={page.save_motivation_label ?? ''}
              modifier="slim"
              loading={updateAssessmentLoading}
            />
          </Form>

          {/* Only for print below */}
          {assessment?.getAssessment?.strategy?.strategy && (
            <Section
              title={page.strategy_title_print ?? ''}
              description={assessment?.getAssessment?.strategy?.strategy ?? ''}
              print={true}
            />
          )}
        </div>
      </div>
    </>
  );
};
