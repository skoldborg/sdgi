'use client';

import React, { useMemo } from 'react';
import { Button, LoadingIndicator } from '@components';
import { GroupField } from '@prismicio/client';
import {
  AssessmentGoalsPageDocumentDataSummaryItem,
  Simplify,
} from '@prismicio-types';
import { useParams } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useGetAssessmentQuery } from '@/app/[locale]/queries.generated';

interface AssessmentSummaryI {
  doc: GroupField<Simplify<AssessmentGoalsPageDocumentDataSummaryItem>>;
}

export const AssessmentSummary = ({ doc }: AssessmentSummaryI) => {
  const { user } = useUser();
  const params = useParams<{ locale: string; url_alias: string }>();
  const ctaHref = `/${params.locale}/tool/assessment/${params.url_alias}/result`;
  const ctaLabel = doc[0]?.button_label ?? 'See result';

  const { data: assessment, loading } = useGetAssessmentQuery({
    variables: {
      userId: user?.sub,
      urlAlias: decodeURI(params.url_alias),
    },
    skip: !user?.sub || !params.url_alias,
  });

  const savedGoals = useMemo(() => {
    let count = 0;

    if (!loading && assessment?.getAssessment?.goals) {
      const { goals } = assessment.getAssessment;

      if (assessment?.getAssessment?.goals.length > 0) {
        for (let i = 0; i < assessment?.getAssessment?.goals.length; i++) {
          if (goals[i]?.saved) count++;
        }
      }
    }

    return count;
  }, [assessment?.getAssessment, loading]);

  if (loading) return <LoadingIndicator />;

  const totalGoals = assessment?.getAssessment?.goals?.length;
  const resultButtonDisabled = savedGoals === totalGoals ? false : true;

  return (
    <div className="w-full bg-white fixed bottom-0 left-0 right-0 z-10 shadow-[0_3px_12px_2px_rgba(0,0,0,0.1)] ease-in-expo">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <div className="bg-white flex items-center text-sm leading-1 py-3 md:text-lg md:py-6 xl:py-8">
          <div className="max-md:flex max-md:flex-wrap max-md:pr-4">
            <div className="mb-1 md:mb-2 font-bold">
              <span>{savedGoals}</span>/
              <span>
                {totalGoals} {doc[0]?.count_suffix}
              </span>
            </div>
            {doc[0]?.summary_description && (
              <p className="m-0 pr-8 max-md:basis-full max-md:text-xs">
                {doc[0].summary_description}
              </p>
            )}
          </div>

          <div className="self-center md:hidden">
            <Button
              link={ctaHref}
              label={ctaLabel}
              color={`black`}
              disabled={resultButtonDisabled}
              size={'small'}
            />
          </div>

          <div className="hidden md:block">
            <Button
              link={ctaHref}
              label={ctaLabel}
              color={`black`}
              disabled={resultButtonDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
