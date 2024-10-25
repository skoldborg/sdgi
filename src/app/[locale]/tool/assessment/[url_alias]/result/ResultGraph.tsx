'use client';

import { useGetAssessmentQuery } from '@/app/[locale]/queries.generated';
import { LoadingIndicator } from '@/app/components';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useParams } from 'next/navigation';

import styles from './result-graph.module.scss';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  GoalPageDocument,
  GoalsDocument,
  ResultPageDocument,
} from '@prismicio-types';
import { BoxRow } from '@/app/components/BoxRow';
import { Goal } from '@/@types/codegen/types';

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

  const scrollerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [scrollFadeModifiers, setScrollFadeModifiers] = useState({
    left: '',
    right: '',
  });
  const [itemsWidth, setItemsWidth] = useState<number | null>(null);

  const getItemsWidth = useCallback(() => {
    const rows = scrollerRef.current?.children ?? null;

    if (rows && rows.length > 0) {
      const rowItems = rows[0].children;
      let width = 0;

      for (let i = 0; i < rowItems.length; i++) {
        const item = rowItems[i] as HTMLElement;
        const itemStyles = window.getComputedStyle(rowItems[i]);

        let itemWidth = item.offsetWidth;
        itemWidth += parseFloat(itemStyles.marginLeft);
        itemWidth += parseFloat(itemStyles.marginRight);

        width += itemWidth;
      }

      setItemsWidth(width);
    }
  }, []);

  const setScrollFade = () => {
    const scrollerEl = scrollerRef.current;
    const scrollFadeModifiers = { left: '', right: '' };

    if (scrollerEl) {
      if (scrollerEl.scrollLeft > 0) {
        scrollFadeModifiers.left = 'result-grap--scroll-fade-left';
      }

      const rightOverflow = itemsWidth
        ? itemsWidth - scrollerEl.offsetWidth - scrollerEl.scrollLeft
        : 0;

      if (
        itemsWidth &&
        itemsWidth > scrollerEl.offsetWidth &&
        !!rightOverflow
      ) {
        scrollFadeModifiers.right = 'result-grap--scroll-fade-right';
      }

      setScrollFadeModifiers(scrollFadeModifiers);
    }
  };

  useEffect(() => {
    getItemsWidth();
  }, [getItemsWidth]);

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
      <h2 className="page__title page__title--lowercase">
        {assessment.getAssessment?.title}
      </h2>

      <div
        className={`${styles.root} ${scrollFadeModifiers.left} ${scrollFadeModifiers.right}`}
      >
        <div className={styles.inner}>
          <div
            ref={scrollerRef}
            className={styles.scrollable}
            onScroll={setScrollFade}
          >
            {impactLevels &&
              assessment?.getAssessment?.goals &&
              impactLevels.map((level, i) => {
                const { value, color, label } = level;

                return (
                  <BoxRow
                    key={i}
                    id={value}
                    label={label}
                    color={color}
                    type={value == 0 ? 'standalone' : undefined}
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
