'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useGetAssessmentsQuery } from '../../queries.generated';
import { AssessmentsPageDocument } from '@prismicio-types';
import { Assessment } from '@/@types/codegen/types';
import { useEffect, useState } from 'react';
import { LoadingIndicator, SearchBar } from '@/app/components';
import AssessmentBar from '@/app/components/AssessmentBar';

interface AssessmentsI extends AssessmentsPageDocument {}

export default function Assessments({ data: page }: AssessmentsI) {
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [visibleAssessments, setVisibleAssessments] = useState<Assessment[]>();

  const { data, loading } = useGetAssessmentsQuery({
    variables: {
      userId: user?.sub,
    },
    skip: !user || !user?.sub,
  });

  const [isLoading, setIsLoading] = useState(true);

  const assessments = data?.getAssessments;

  const searchAssessments = (input: string) => {
    if (!assessments || !input) {
      setVisibleAssessments([]);
      return;
    }

    const normalizedInput = input.toLowerCase();
    const filteredAssessments = assessments
      .filter((item): item is Assessment => item !== null)
      .filter((item) => item.title.toLowerCase().includes(normalizedInput));

    setVisibleAssessments(filteredAssessments);
    setSearchTerm(input);
  };

  useEffect(() => {
    if (!loading && assessments) {
      if (assessments.length > 0) {
        setVisibleAssessments(assessments as Assessment[]);
      } else {
        setVisibleAssessments([]);
      }
      setIsLoading(false);
    }
  }, [assessments, loading]);

  useEffect(() => {
    if (searchTerm !== '') {
      searchAssessments(searchTerm);
    } else {
      setVisibleAssessments(assessments as Assessment[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const hasVisibleAssessments =
    visibleAssessments && visibleAssessments.length > 0;

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      {assessments && assessments.length > 0 && (
        <SearchBar
          placeholder={page.search_placeholder ?? ''}
          value={searchTerm}
          onChange={(input: string) => setSearchTerm(input)}
        />
      )}
      {hasVisibleAssessments ? (
        <ul className="max-w-screen-lg mx-auto p-0">
          {visibleAssessments.map((a, i) => (
            <li
              key={a?.title}
              className={`mb-5 last-child:mb-0 opacity-0 animate-[fadeIn_0.65s_ease_forwards]`}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <AssessmentBar
                content={{
                  update: page.update_assessment_modal[0],
                  create: page.create_assessment_modal[0],
                }}
                assessment={a}
              >
                {a?.title}
              </AssessmentBar>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>
          {assessments?.length === 0 && page.no_assessments_message}
        </p>
      )}
    </>
  );
}
