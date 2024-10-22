'use client';

import {
  GetUserDocument,
  useCreateAssessmentMutation,
} from '@/app/[locale]/queries.generated';
import { Modal, Form, useModal, Button } from '@/app/components';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import {
  AssessmentsPageDocumentDataCreateAssessmentModalItem,
  Simplify,
} from '@prismicio-types';

interface CreateAssessmentButtonI {
  label: string;
  content: {
    create:
      | Simplify<AssessmentsPageDocumentDataCreateAssessmentModalItem>
      | undefined;
  };
}

export const CreateAssessmentButton = ({
  label,
  content,
}: CreateAssessmentButtonI) => {
  const { closeModal, registerModal } = useModal();

  const [assessmentData, setAssessmentData] = useState({
    title: '',
    description: '',
  });

  // Use GraphQL error

  const { user } = useUser();

  const refetchQueries = [
    {
      query: GetUserDocument,
      variables: {
        userId: user?.sub,
      },
      skip: !user?.sub,
    },
  ];

  const [createAssessment, { error }] = useCreateAssessmentMutation({
    variables: {
      userId: user?.sub,
      title: assessmentData.title,
      description: assessmentData.description,
    },
    onCompleted: () => {
      closeModal();
    },
    awaitRefetchQueries: true,
    refetchQueries,
  });

  return (
    <Button
      label={label}
      size={`small`}
      onClick={() =>
        registerModal(
          <Modal.Window
            id="edit-assessment-modal"
            title={content?.create?.title ?? ''}
            description={content?.create?.description ?? ''}
          >
            <Form
              onSubmit={createAssessment}
              error={error?.message && error.message !== '' ? true : false}
              message={error?.message ?? ''}
            >
              <Form.TextInput
                id="title"
                label={content.create?.title_field_label ?? ''}
                required
                onChange={(e) =>
                  setAssessmentData((data) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
              />
              <Form.TextArea
                label={content.create?.description_field_label ?? ''}
                placeholder={
                  content.create?.description_field_placeholder ?? ''
                }
                maxLength={4000}
                required
                onChange={(e) =>
                  setAssessmentData((data) => ({
                    ...data,
                    description: e.target.value,
                  }))
                }
              />
              <Form.Submit label={content.create?.submit_button_label ?? ''} />
            </Form>
          </Modal.Window>,
        )
      }
    />
  );
};
