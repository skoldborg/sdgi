'use client';

import {
  GetAssessmentDocument,
  useAddOrUpdateAssessmentStrategyMutation,
  useGetAssessmentQuery,
} from '@/app/[locale]/queries.generated';
import { Form } from '@/app/components';
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
      <div className="print-only pb-6 md:pb-[110px]">
        <h3 className="text-2xl mb-6">{title}</h3>
        <p className="text-xs mb-4 md:mb-10 max-w-screen-md">
          {assessment.getAssessment?.description ?? ''}
        </p>
      </div>

      <div className="relative pb-6 md:pb-[110px]">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-2xl md:text-4xl text-center mb-6 md:mb-10">
            {page.strategy_title}
          </h2>
          <p className="text-base md:text-lg mb-8 md:mb-10 max-w-screen-md">
            {page.strategy_description}
          </p>

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
              label="Describe your strategy"
              hiddenLabel
              placeholder={page.motivation_placeholder ?? ''}
              defaultValue={assessment?.getAssessment?.strategy?.strategy}
              onChange={(e) => setStrategy(e.target.value)}
              maxLength={4000}
            />
            <Form.Submit
              label={page.save_motivation_label ?? ''}
              variant="slim"
              loading={updateAssessmentLoading}
            />
          </Form>

          {/* Only for print below */}
          {assessment?.getAssessment?.strategy?.strategy && (
            <div className="print-only pb-6 md:pb-[110px]">
              <h3 className="text-2xl mb-6">
                {page.strategy_title_print ?? ''}
              </h3>
              <p className="text-xs mb-4 md:mb-10 max-w-screen-md">
                {assessment?.getAssessment?.strategy?.strategy ?? ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
