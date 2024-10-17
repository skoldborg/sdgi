'use client';

import { ChangeEvent, PropsWithChildren, useState } from 'react';
import './assessmentbar.scss';
import { Assessment } from '@/@types/codegen/types';
import Link from 'next/link';
import {
  CommonTranslationsDocument,
  Simplify,
  AssessmentsPageDocumentDataUpdateAssessmentModalItem,
  AssessmentsPageDocumentDataCreateAssessmentModalItem,
} from '../../../../prismicio-types';
import {
  GetUserDocument,
  useRemoveAssessmentMutation,
  useUpdateAssessmentMutation,
} from '@/app/[locale]/queries.generated';
import { Modal, useModal, Form } from '@/app/components';

interface AssessmentBarI extends PropsWithChildren {
  commonTranslations: CommonTranslationsDocument;
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

const AssessmentBar = ({
  assessment,
  content,
  commonTranslations,
}: AssessmentBarI) => {
  const { registerModal, closeModal } = useModal();

  const { _id, user_id, title, description, url_alias, goals } = assessment;

  const [overlayHidden, setOverlayHidden] = useState(true);

  const labels = commonTranslations.data.button_labels[0] ?? null;
  const url = url_alias ? `assessment/${url_alias}` : '';

  let savedGoals = 0;
  if (goals?.length) {
    for (const goal of goals) {
      if (goal?.saved) savedGoals++;
    }
  }

  const refetchQueries = [
    {
      query: GetUserDocument,
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

  const [removeAssessment] = useRemoveAssessmentMutation({
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
    <Link className={`assessment-bar`} href={url}>
      <h3 className={`assessment-bar__title`}>{title}</h3>
      <p className={`assessment-bar__body`}>{description}</p>

      <div className={`assessment-bar__goals-counter`}>
        <span>{savedGoals}</span>/<span>17</span>
      </div>

      <button
        onClick={(e) => openAssessmentUpdateModal(e)}
        className="assessmentbar__edit-button"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setOverlayHidden(false);
        }}
        className="assessmentbar__trash-button"
      />

      <div
        className={`assessment-bar__overlay`}
        aria-hidden={overlayHidden}
        onClick={(e) => e.preventDefault()}
      >
        <div className="assessment-bar__overlay-btn-group">
          <button
            className="assessment-bar__overlay-btn"
            onClick={() => removeAssessment()}
          >
            {labels?.yes__delete ?? 'Yes, delete'}
          </button>
          <button
            className="assessment-bar__overlay-btn"
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
