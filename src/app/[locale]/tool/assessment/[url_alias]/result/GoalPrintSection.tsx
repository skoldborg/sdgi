'use client';

import { useGetAssessmentQuery } from '@/app/[locale]/queries.generated';
import { Button, GoalCard, Option } from '@/app/components';
import { useUser } from '@auth0/nextjs-auth0/client';
import { GoalPageDocument, GoalsDocument } from '@prismicio-types';
import { useParams } from 'next/navigation';

import styles from './goal-print-box.module.scss';

interface GoalPrintSectionI extends GoalPageDocument {
  goalsDoc: GoalsDocument;
  printButtonLabel: string;
}

export const GoalPrintSection = ({
  data: page,
  goalsDoc,
  printButtonLabel,
}: GoalPrintSectionI) => {
  const { user } = useUser();
  const params = useParams<{ url_alias: string }>();

  const goals = goalsDoc.data.body;

  const { data: assessment, loading } = useGetAssessmentQuery({
    variables: {
      userId: user?.sub,
      urlAlias: decodeURI(params.url_alias),
    },
    skip: !user?.sub || !params.url_alias,
  });

  if (!assessment || loading) return;

  return (
    <>
      <Button
        onClick={() => window.print()}
        position="center"
        color="black"
        icon={'print'}
        label={printButtonLabel}
      />
      <div className="print-only">
        {assessment?.getAssessment?.goals?.map((g) => {
          const title =
            goals.find((goal) => Number(goal.primary.id) === g?.goal_id)
              ?.primary.title ?? '';
          const description =
            goals.find((goal) => Number(goal.primary.id) === g?.goal_id)
              ?.primary.description ?? '';

          const formattedTitle = title.replace(/--\s*/, '').trim();
          let impactLabel = '';

          page.impact_options.forEach((option) => {
            if (g?.impact === option.value) {
              impactLabel = option.label ?? '';
            } else if (g?.impact === 0) {
              impactLabel = page?.impact_options[5]?.label ?? '';
            }
          });

          return (
            <div className={styles.root} key={g?.goal_id}>
              <div className={styles.header}>
                <div
                  className={`${styles.goalId} ${styles.goalId}--${g?.goal_id}`}
                >
                  <GoalCard goal_id={Number(g?.goal_id)} />
                </div>
                <div className={styles.headerContent}>
                  <h2 className={styles.title}>{formattedTitle}</h2>
                  <p className={styles.description}>{description}</p>
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.contentBox}>
                  <h3 className={styles.contentTitle}>Impact</h3>
                  <Option label={impactLabel} type={`locked`} />
                </div>
                {g?.motivation && (
                  <div className={styles.contentBox}>
                    <h3 className={styles.contentTitle}>Motivation</h3>
                    <p className={styles.contentText}>{g?.motivation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
