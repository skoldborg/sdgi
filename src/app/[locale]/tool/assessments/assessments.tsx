'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useGetUserQuery } from '../../queries.generated';
import { AssessmentsPageDocument } from '../../../../../prismicio-types';
import { Assessment } from '../../../../@types/codegen/types';
import { useEffect, useState } from 'react';
import SearchBar from '@/app/components/SearchBar';

interface AssessmentsI extends AssessmentsPageDocument {}

export default function Assessments({ data: page }: AssessmentsI) {
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [visibleAssessments, setVisibleAssessments] = useState<Assessment[]>();

  const { data } = useGetUserQuery({
    variables: {
      userId: user?.sub,
    },
    skip: !user || !user?.sub,
  });

  const assessments = data?.getUser?.assessments;

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
    if (assessments && assessments.length > 0) {
      setVisibleAssessments(assessments as Assessment[]);
    }
  }, [assessments]);

  useEffect(() => {
    if (searchTerm !== '') {
      searchAssessments(searchTerm);
    } else {
      setVisibleAssessments(assessments as Assessment[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div>
      {assessments && assessments.length > 0 && (
        <SearchBar
          placeholder={page.search_placeholder ?? ''}
          value={searchTerm}
          onChange={(input: string) => setSearchTerm(input)}
        />
      )}
      <ul>
        {visibleAssessments && visibleAssessments.length > 0 ? (
          visibleAssessments.map((a) => <div key={a?.title}>{a?.title}</div>)
        ) : (
          <p style={{ textAlign: 'center' }}>{page.no_assessments_message}</p>
        )}
      </ul>
    </div>
  );
}
