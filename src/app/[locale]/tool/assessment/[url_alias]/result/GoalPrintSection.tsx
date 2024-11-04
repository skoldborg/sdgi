'use client';

import { useGetAssessmentQuery } from '@/app/[locale]/queries.generated';
import { GoalCard, Option } from '@/app/components';
import { useUser } from '@auth0/nextjs-auth0/client';
import { GoalPageDocument, GoalsDocument } from '@prismicio-types';
import { useParams } from 'next/navigation';

interface GoalPrintSectionI extends GoalPageDocument {
  goalsDoc: GoalsDocument;
}

export const GoalPrintSection = ({
  data: page,
  goalsDoc,
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
    <div>
      {assessment?.getAssessment?.goals?.map((g) => {
        const title =
          goals.find((goal) => Number(goal.primary.id) === g?.goal_id)?.primary
            .title ?? '';
        const description =
          goals.find((goal) => Number(goal.primary.id) === g?.goal_id)?.primary
            .description ?? '';

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
          <div className="goal-print-box" key={g?.goal_id}>
            <div className="goal-print-box__header">
              <div
                className={`goal-print-box__goal-id goal-print-box__goal-id--${g?.goal_id}`}
              >
                <GoalCard goal_id={Number(g?.goal_id)} />
              </div>
              <div className="goal-print-box__header-content">
                <h2 className="goal-print-box__title">{formattedTitle}</h2>
                <p className="goal-print-box__description">{description}</p>
              </div>
            </div>

            <div className="goal-print-box__content">
              <div className="goal-print-box__content-box">
                <h3 className="goal-print-box__content-title">Impact</h3>
                <Option label={impactLabel} type={`locked`} />
              </div>
              {g?.motivation && (
                <div className="goal-print-box__content-box">
                  <h3 className="goal-print-box__content-title">Motivation</h3>
                  <p className="goal-print-box__content-text">
                    {g?.motivation}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
