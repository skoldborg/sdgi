'use client';

import { ChangeEvent, PropsWithChildren, useState } from 'react';
import { Assessment } from '@/@types/codegen/types';
import Link from 'next/link';
import {
  Simplify,
  AssessmentsPageDocumentDataUpdateAssessmentModalItem,
  AssessmentsPageDocumentDataCreateAssessmentModalItem,
} from '@prismicio-types';
import {
  GetAssessmentsDocument,
  useRemoveAssessmentMutation,
  useUpdateAssessmentMutation,
} from '@/app/[locale]/queries.generated';
import { Modal, useModal, Form, LoadingIndicator } from '@/app/components';
import { useContentContext } from '@/app/contexts/content-context';
import classNames from 'classnames';

interface AssessmentBarI extends PropsWithChildren {
  assessment: Assessment;
  content: {
    update:
      | Simplify<AssessmentsPageDocumentDataUpdateAssessmentModalItem>
      | undefined;
    create:
      | Simplify<AssessmentsPageDocumentDataCreateAssessmentModalItem>
      | undefined;
  };
}

const AssessmentBar = ({ assessment, content }: AssessmentBarI) => {
  const { registerModal, closeModal } = useModal();
  const { commonTranslations } = useContentContext();

  const { _id, user_id, title, description, url_alias, goals } = assessment;

  const [overlayHidden, setOverlayHidden] = useState(true);

  const labels = commonTranslations?.data.button_labels[0] ?? null;
  const url = url_alias ? `assessment/${encodeURI(url_alias)}` : '';

  let savedGoals = 0;
  if (goals?.length) {
    for (const goal of goals) {
      if (goal?.saved) savedGoals++;
    }
  }

  const refetchQueries = [
    {
      query: GetAssessmentsDocument,
      variables: {
        userId: user_id,
      },
      skip: !user_id,
    },
  ];

  const [assessmentDescription, setAssessmentDescription] = useState(
    assessment.description,
  );

  const [updateAssessment, { error }] = useUpdateAssessmentMutation({
    variables: {
      userId: user_id,
      urlAlias: url_alias,
      title: assessment.title,
      description: assessmentDescription,
    },
    onCompleted: () => {
      closeModal();
    },
    awaitRefetchQueries: true,
    refetchQueries,
  });

  const openAssessmentUpdateModal = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    registerModal(
      <Modal.Window
        id="edit-assessment-modal"
        title={content?.update?.title ?? ''}
        description={content?.update?.description ?? ''}
      >
        <Form
          onSubmit={updateAssessment}
          error={error?.message && error.message !== '' ? true : false}
          message={error?.message ?? ''}
        >
          <Form.TextInput
            id="title"
            label={content.create?.title_field_label ?? ''}
            defaultValue={assessment.title}
            required
            disabled
          />
          <Form.TextArea
            label={content.create?.description_field_label ?? ''}
            placeholder={content.create?.description_field_placeholder ?? ''}
            maxLength={4000}
            defaultValue={assessmentDescription}
            required
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setAssessmentDescription(e.target.value)
            }
          />
          <Form.Submit label={content.update?.submit_button_label ?? ''} />
        </Form>
      </Modal.Window>,
    );
  };

  const [removeAssessment, { loading: removeAssessmentLoading }] =
    useRemoveAssessmentMutation({
      variables: {
        id: _id,
      },
      onCompleted: () => {
        setOverlayHidden(true);
      },
      awaitRefetchQueries: true,
      refetchQueries,
    });

  return (
    <Link
      className="relative block bg-white p-6 text-dark hover:shadow transition-all duration-200 ease-in-expo hover:translate-y-[-1px] md:p-8"
      href={url}
    >
      <h3 className="text-lg leading-7 md:text-2xl md:leading-8 mt-0 mb-4">
        {title}
      </h3>
      <p className="mr-16 mb-2 overflow-hidden line-clamp-2">{description}</p>

      <div className="absolute top-6 right-6 text-gray-dark md:top-8 md:right-8">
        <span>{savedGoals}</span>/<span>17</span>
      </div>

      <button
        onClick={(e) => openAssessmentUpdateModal(e)}
        className="bg-[url('/icons/edit-lined.svg')] hover:bg-[url('/icons/edit.svg')] absolute bottom-8 right-[60px] w-6 h-6 transition-opacity bg-center bg-no-repeat"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setOverlayHidden(false);
        }}
        className="bg-[url('/icons/trashy.svg')] hover:bg-[url('/icons/trash.svg')] absolute bottom-8 right-8 w-6 h-6 transition-opacity bg-center bg-no-repeat"
      />

      <div
        className={classNames(
          'absolute top-0 left-0 w-full h-full content-center flex-col pb-4 font-header bg-white/90 justify-end items-end',
          overlayHidden ? 'hidden' : 'flex',
        )}
        aria-hidden={overlayHidden}
        onClick={(e) => e.preventDefault()}
      >
        <div className="flex justify-end items-end mr-4">
          {removeAssessmentLoading && (
            <LoadingIndicator additionalClasses="h-10 m-0 flex content-center items-center mr-4" />
          )}
          <button
            className="max-w-30 py-[6px] px-4 m-1 text-white bg-dark hover:bg-[#333]"
            onClick={() => removeAssessment()}
          >
            {labels?.yes__delete ?? 'Yes, delete'}
          </button>
          <button
            className="max-w-30 py-[6px] px-4 m-1 text-black bg-gray hover:bg-[#e5e5e5]"
            onClick={() => setOverlayHidden(true)}
          >
            {labels?.cancel ?? 'Cancel'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default AssessmentBar;
