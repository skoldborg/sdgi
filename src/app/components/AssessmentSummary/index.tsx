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

import styles from './assessment-summary.module.scss';

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
  console.log(resultButtonDisabled);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <div className={styles.summary}>
              <span>{savedGoals}</span>/
              <span>
                {totalGoals} {doc[0]?.count_suffix}
              </span>
            </div>
            {doc[0]?.summary_description && (
              <p className={styles.body}>{doc[0].summary_description}</p>
            )}
          </div>

          <div className={styles.buttonMobile}>
            <Button
              link={ctaHref}
              label={ctaLabel}
              color={`black`}
              disabled={resultButtonDisabled}
              size={'small'}
            />
          </div>

          <div className={styles.button}>
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
