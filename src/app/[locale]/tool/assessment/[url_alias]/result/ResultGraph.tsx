'use client';

import { useGetAssessmentQuery } from '@/app/[locale]/queries.generated';
import { LoadingIndicator } from '@/app/components';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useParams } from 'next/navigation';

import {
  GoalPageDocument,
  GoalsDocument,
  ResultPageDocument,
} from '@prismicio-types';
import { BoxRow, BoxRowColor } from '@/app/components/BoxRow';
import { Goal } from '@/@types/codegen/types';
import classNames from 'classnames';

const impactColors = [
  {
    impact: 5,
    color: 'green',
  },
  {
    impact: 4,
    color: 'green',
  },
  {
    impact: 3,
    color: 'gray',
  },
  {
    impact: 2,
    color: 'red',
  },
  {
    impact: 1,
    color: 'red',
  },
  {
    impact: 0,
    color: 'gray-light',
  },
];

interface ResultGraphI extends GoalPageDocument {
  goalsDoc: GoalsDocument;
  resultPage: ResultPageDocument;
}

export const ResultGraph = ({
  data: page,
  goalsDoc,
  resultPage,
}: ResultGraphI) => {
  const { user } = useUser();
  const params = useParams<{ locale: string; url_alias: string }>();

  const { data: assessment, loading } = useGetAssessmentQuery({
    variables: {
      userId: user?.sub,
      urlAlias: decodeURI(params.url_alias),
    },
    skip: !user?.sub || !params.url_alias,
  });

  if (!assessment || loading) return <LoadingIndicator />;

  const impactLevels =
    page.impact_options.reduce(
      (acc, o) => {
        return [
          ...acc,
          {
            label: o.label ?? '',
            value: Number(o.value),
            color:
              impactColors.find((color) => color.impact === o.value)?.color ||
              'white',
          },
        ];
      },
      [] as {
        label: string;
        value: number;
        color?: string;
      }[],
    ) ?? null;

  return (
    <>
      <h2 className={classNames('text-2xl md:text-[40px] mb-8')}>
        {assessment.getAssessment?.title}
      </h2>

      <div className="mt-0 mb-12 print:mb-0">
        <div className="relative overflow-hidden whitespace-nowrap">
          <div className="float-left overflow-y-hidden overflow-x-auto w-full py-6">
            {impactLevels &&
              assessment?.getAssessment?.goals &&
              impactLevels.map((level, i) => {
                const { value, color, label } = level;

                return (
                  <BoxRow
                    key={i}
                    id={value}
                    label={label}
                    color={color as BoxRowColor}
                    standalone={value == 0 ? true : false}
                    assessmentGoals={assessment.getAssessment?.goals as Goal[]}
                    impactOptions={page.impact_options}
                    goalsDoc={goalsDoc}
                    resultPage={resultPage}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
