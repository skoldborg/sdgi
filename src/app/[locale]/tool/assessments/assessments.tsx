'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useGetUserQuery } from '../../queries.generated';
import {
  AssessmentsPageDocument,
  CommonTranslationsDocument,
} from '../../../../../prismicio-types';
import { Assessment } from '@/@types/codegen/types';
import { useEffect, useState } from 'react';
import { SearchBar } from '@/app/components';
import AssessmentBar from '@/app/components/AssessmentBar';

import styles from './assessments.module.scss';

interface AssessmentsI extends AssessmentsPageDocument {
  commonTranslations: CommonTranslationsDocument;
}

export default function Assessments({
  data: page,
  commonTranslations,
}: AssessmentsI) {
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [visibleAssessments, setVisibleAssessments] = useState<Assessment[]>();

  const { data, loading } = useGetUserQuery({
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

  const hasAssessments = assessments && assessments.length > 0;

  return (
    <div>
      {hasAssessments && (
        <SearchBar
          placeholder={page.search_placeholder ?? ''}
          value={searchTerm}
          onChange={(input: string) => setSearchTerm(input)}
        />
      )}
      {visibleAssessments && visibleAssessments.length > 0 ? (
        <ul className={styles.list}>
          {visibleAssessments.map((a) => (
            <li key={a?.title} className={styles.item}>
              <AssessmentBar
                content={{
                  update: page.update_assessment_modal[0],
                  create: page.create_assessment_modal[0],
                }}
                assessment={a}
                commonTranslations={commonTranslations}
              >
                {a?.title}
              </AssessmentBar>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>
          {!loading && hasAssessments && page.no_assessments_message}
        </p>
      )}
    </div>
  );
}
