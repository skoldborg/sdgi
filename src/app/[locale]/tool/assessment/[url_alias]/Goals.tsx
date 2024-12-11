'use client';

import { useGetAssessmentQuery } from '@/app/[locale]/queries.generated';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useParams } from 'next/navigation';
import { AssessmentGoalsPageDocument, GoalsDocument } from '@prismicio-types';
import { Button, Grid, Modal, useModal, GoalCard } from '@/app/components';
import { PrismicRichText } from '@prismicio/react';
import { useEffect, useMemo, useState } from 'react';
import GridSorted from '@/app/components/GridSorted';
import Link from 'next/link';
import classNames from 'classnames';

interface GoalsI extends AssessmentGoalsPageDocument {
  goalsDoc: GoalsDocument<string>;
}

export const Goals = ({ data: page, goalsDoc }: GoalsI) => {
  const { user } = useUser();
  const { url_alias, locale } = useParams<{
    locale: string;
    url_alias: string;
  }>();

  const { registerModal, closeModal } = useModal();

  const { data: assessment, loading } = useGetAssessmentQuery({
    variables: {
      userId: user?.sub,
      urlAlias: decodeURI(url_alias),
    },
    skip: !user?.sub || !url_alias,
  });

  const sortModalLink = useMemo(() => {
    if (assessment?.getAssessment?.goals) {
      const firstGoalId = assessment?.getAssessment?.goals[0]?._id;
      return `${url_alias}/sort/${firstGoalId}/1`;
    }
  }, [assessment?.getAssessment?.goals, url_alias]);

  const sortedGoalsCount = useMemo(() => {
    return assessment?.getAssessment
      ? assessment.getAssessment.goals?.filter(
          (goal) => goal?.relevance !== null,
        ).length
      : 0;
  }, [assessment?.getAssessment]);

  // If all goals haven't been sorted, navigate to sorting
  useEffect(() => {
    const navigateToGoalSortingTimer = setTimeout(() => {
      if (
        typeof sortedGoalsCount === 'number' &&
        sortedGoalsCount < 17 &&
        sortModalLink
      ) {
        registerModal(
          <Modal.Window
            id="goal-sorting-modal"
            title={page.goal_sorting_modal[0]?.title ?? ''}
            description={
              <PrismicRichText
                field={page.goal_sorting_modal[0]?.sorting_instructions}
              />
            }
            preventClose
          >
            <div className="flex flex-justify-center">
              <Button
                link={sortModalLink}
                onClick={() => closeModal()}
                label={page.goal_sorting_modal[0]?.button_label ?? ''}
              />
            </div>
          </Modal.Window>,
        );
      }
    }, 2000);

    return () => clearTimeout(navigateToGoalSortingTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedGoalsCount, sortModalLink]);

  // Get data for each asssessment goal and render card for each
  const [goalCards, setGoalCards] = useState<JSX.Element[] | undefined>([]);
  const goalCardsMemo = useMemo(() => {
    if (assessment?.getAssessment && !loading) {
      return assessment.getAssessment.goals?.map((g, i) => (
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
    }
    return [];
  }, [
    assessment,
    loading,
    locale,
    url_alias,
    goalsDoc.data.body,
    page.goal_overview_labels,
  ]);

  useEffect(() => {
    setGoalCards(goalCardsMemo);
  }, [goalCardsMemo]);

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
      <Link href={`/${locale}/tool/assessments`}>
        <Button size="small" label={page.save_and_close} className="mb-6" />
      </Link>

      <h2 className={classNames('text-2xl md:text-[40px] mb-8')}>
        {assessment?.getAssessment?.title}
      </h2>

      <div className="text-xl max-w-screen-md mb-8">
        {<PrismicRichText field={page.description} />}
      </div>

      {sortedGoalsCount !== null && goalCards && renderGoalCardGrid()}
    </>
  );
};
