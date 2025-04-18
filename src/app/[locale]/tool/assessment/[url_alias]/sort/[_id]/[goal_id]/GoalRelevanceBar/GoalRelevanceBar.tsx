'use client';

import {
  GetAssessmentDocument,
  useGetAssessmentQuery,
  useUpdateGoalMutation,
} from '@/app/[locale]/queries.generated';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useParams, useRouter } from 'next/navigation';
import {
  AssessmentGoalsPageDocumentDataGoalPrioritiesItem,
  Simplify,
} from '@prismicio-types';
import { Button, LoadingIndicator } from '@/app/components';
import { GroupField } from '@prismicio/client';
import { useContentContext } from '@/app/contexts/content-context';

interface GoalRelevanceBarI {
  goalPriorities: GroupField<
    Simplify<AssessmentGoalsPageDocumentDataGoalPrioritiesItem>
  >;
}

export const GoalRelevanceBar = ({ goalPriorities }: GoalRelevanceBarI) => {
  const { user } = useUser();
  const router = useRouter();

  const { commonTranslations } = useContentContext();

  const { locale, url_alias, _id, goal_id } = useParams<{
    locale: string;
    url_alias: string;
    _id: string;
    goal_id: string;
  }>();

  const errorMsgs = commonTranslations?.data.error_messages[0] ?? null;

  const { data: assessment, loading } = useGetAssessmentQuery({
    variables: {
      userId: user?.sub,
      urlAlias: decodeURI(url_alias),
    },
    skip: !user?.sub || !url_alias,
  });

  const navigateToNextGoal = () => {
    const goals = assessment?.getAssessment?.goals;
    const nextGoalId = parseInt(goal_id) + 1;
    let nextGoalDatabaseId;

    goals &&
      goals.forEach((goal) => {
        if (goal?.goal_id == nextGoalId) {
          nextGoalDatabaseId = goal._id;
        }
      });

    const nextGoalHref =
      nextGoalId > 17
        ? `/${locale}/tool/assessment/${url_alias}`
        : `/${locale}/tool/assessment/${url_alias}/sort/${nextGoalDatabaseId}/${nextGoalId}`;

    router.push(nextGoalHref);
  };

  const refetchQueries = [
    {
      query: GetAssessmentDocument,
      variables: {
        userId: user?.sub,
        urlAlias: decodeURI(url_alias),
      },
      skip: !user?.sub || !url_alias,
    },
  ];

  const [updateGoal, { error, loading: updateGoalLoading }] =
    useUpdateGoalMutation({
      onCompleted: () => {
        navigateToNextGoal();
      },
      awaitRefetchQueries: true,
      refetchQueries,
    });

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    relevance: number,
  ) => {
    e.preventDefault();

    updateGoal({
      variables: {
        id: _id,
        input: {
          relevance,
        },
      },
    });
  };

  return (
    <div className="w-full bg-white fixed bottom-0 left-0 right-0 z-10 shadow-[0_-8px_10px_0_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-expo">
      <div className="max-w-6xl mx-auto px-3 mb:px-6">
        {loading ||
          (updateGoalLoading && (
            <LoadingIndicator additionalClasses="absolute top-3 left-[50%] -translate-x-[50%] m-0" />
          ))}

        <div className="flex justify-center flex-col items-center py-12">
          {goalPriorities && (
            <>
              <div className="flex justify-center items-center flex-col gap-6 md:flex-row">
                <Button
                  label={goalPriorities[0]?.label ?? ''}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClick(e, 1)
                  }
                  disabled={loading}
                  className="min-w-[260px] md:mb-6"
                />
                <Button
                  label={goalPriorities[1]?.label ?? ''}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClick(e, 2)
                  }
                  disabled={loading}
                  className="min-w-[260px] mb-6"
                />
              </div>

              <Button
                label={goalPriorities[2]?.label ?? ''}
                color="gray"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleClick(e, 3)
                }
                disabled={loading}
                className="min-w-[260px] mb-0"
              />
            </>
          )}

          {error && (
            <div className="font-bold text-red">
              {errorMsgs?.save_assessment}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
