'use client';

import { useGetAssessmentQuery } from '@/app/[locale]/queries.generated';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useParams, useRouter } from 'next/navigation';
import {
  AssessmentGoalsPageDocument,
  GoalsDocument,
} from '../../../../../../prismicio-types';
import { Button, Grid } from '@/app/components';
import { PrismicRichText } from '@prismicio/react';
import { useEffect, useState } from 'react';
import GoalCard from '@/app/components/GoalCard';
import GridSorted from '@/app/components/GridSorted';

interface GoalsI extends AssessmentGoalsPageDocument {
  goalsDoc: GoalsDocument<string>;
}

export const Goals = ({ data: page, goalsDoc }: GoalsI) => {
  const router = useRouter();
  const { user } = useUser();
  const { url_alias, locale } = useParams<{
    locale: string;
    url_alias: string;
  }>();

  const {
    data: assessment,
    loading,
    error,
  } = useGetAssessmentQuery({
    variables: {
      userId: user?.sub,
      urlAlias: decodeURI(url_alias),
    },
    skip: !user?.sub || !url_alias,
  });

  const [goalCards, setGoalCards] = useState<JSX.Element[] | undefined>([]);

  useEffect(() => {
    if (assessment?.getAssessment && !loading) {
      const gc = assessment.getAssessment.goals?.map((g, i) => (
        <GoalCard
          key={g?._id}
          href={`/${locale}/tool/assessment/${url_alias}/${g?._id}/${g?.goal_id}`}
          title={goalsDoc.data.body[i].primary.title ?? ''}
          locales={{
            done: page.goal_overview_labels[0]?.done ?? 'Done',
            edit: page.goal_overview_labels[0]?.edit ?? 'Edit',
          }}
          saved={!!g?.saved}
          {...g}
        />
      ));

      setGoalCards(gc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment, loading]);

  if (loading) return;
  if (error) return;

  const sortedGoalsCount = assessment?.getAssessment
    ? assessment.getAssessment.goals?.filter((goal) => goal?.relevance !== null)
        .length
    : 0;

  const renderGoalCardGrid = () => {
    let gridComponent;

    if (sortedGoalsCount === 17 && goalCards && goalCards.length > 0) {
      gridComponent = (
        <GridSorted items={goalCards} goalPriorities={page.goal_priorities} />
      );
    } else {
      gridComponent = <Grid items={goalCards} />;
    }

    return gridComponent;
  };

  return (
    <>
      <Button
        size="small"
        label={page.save_and_close}
        onClick={() => router.back()}
      />

      <h2 className={`page__title`}>{assessment?.getAssessment?.title}</h2>

      <div className="page__preamble">
        {<PrismicRichText field={page.description} />}
      </div>

      {sortedGoalsCount !== null && goalCards && renderGoalCardGrid()}
    </>
  );
};
