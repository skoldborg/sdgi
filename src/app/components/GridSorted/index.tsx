import React from 'react';
import './grid-sorted.scss';
import { LinedHeader, Grid } from '@components';
import { GroupField } from '@prismicio/client';
import {
  AssessmentGoalsPageDocumentDataGoalPrioritiesItem,
  Simplify,
} from '../../../../prismicio-types';

const GridSorted = ({
  items,
  goalPriorities,
}: {
  items: JSX.Element[] | undefined;
  goalPriorities: GroupField<
    Simplify<AssessmentGoalsPageDocumentDataGoalPrioritiesItem>
  >;
}) => {
  const sortedGoalCards = items?.reduce(
    (acc, item) => {
      const key = item.props.relevance - 1;
      if (!acc[key]) {
        acc[key] = { goalCards: [] };
      }

      acc[key].goalCards.push(item);
      return acc;
    },
    [] as Record<string, JSX.Element[]>[],
  );

  return (
    <div className="grid-sorted">
      {goalPriorities.map((relevance, i) => {
        const { label, value } = relevance;

        return (
          <div key={i} className="grid-sorted__row">
            {sortedGoalCards &&
              value &&
              sortedGoalCards[value - 1]?.goalCards && (
                <>
                  <LinedHeader headertitle={label ?? ''} />
                  <Grid items={sortedGoalCards[value - 1].goalCards} />
                </>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default GridSorted;
