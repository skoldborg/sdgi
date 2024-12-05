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
        center
        color="black"
        icon={'print'}
        label={printButtonLabel}
        className="print:hidden"
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
            <div
              data-component="goal-print-section"
              className="flex flex-col border-b first:border-t border-solid border-gray print:break-inside-avoid"
              key={g?.goal_id}
            >
              <div className="relative flex mt-6 mb-6">
                <div
                  className={`${styles.goalId} ${styles.goalId}--${g?.goal_id}`}
                >
                  <GoalCard goal_id={Number(g?.goal_id)} />
                </div>
                <div className="w-[55%]">
                  <h2 className="font-header text-2xl flex mb-1 -mt-1">
                    {formattedTitle}
                  </h2>
                  <p className="text-sm m-0">{description}</p>
                </div>
              </div>

              <div className="flex pb-4 mt-2">
                <div className="w-[25%] mr-6">
                  <h3 className="font-header text-base mb-3">Impact</h3>
                  <Option label={impactLabel} type={`locked`} />
                </div>
                {g?.motivation && (
                  <div className="w-[75%]">
                    <h3 className="font-header text-base mb-3">Motivation</h3>
                    <p className="text-xs leading-5">{g?.motivation}</p>
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
