'use client';

import { Modal, Form } from '@/app/components';
import {
  CommonTranslationsDocument,
  AssessmentsPageDocument,
} from '../../../../prismicio-types';
import { useState } from 'react';
import { Assessment } from '@/@types/codegen/types';

interface CreateAssessmentFormI extends AssessmentsPageDocument {
  commonTranslations: CommonTranslationsDocument;
  activeAssessment: Assessment;
}

const CreateAssessmentForm = ({
  commonTranslations,
  activeAssessment,
  data: page,
}: CreateAssessmentFormI) => {
  const errors = commonTranslations.data.error_messages ?? null;
  const [createAssessmentError, setCreateAssessmentError] = useState('');

  const { create_assessment_modal, update_assessment_modal } = page;
  const {
    title: createTitle,
    description: createDescription,
    submit_button_label: createSubmitLabel,
    title_field_label,
    description_field_label,
    description_field_placeholder,
  } = create_assessment_modal[0] || {};

  const {
    title: updateTitle,
    description: updateDescription,
    submit_button_label: updateSubmitLabel,
  } = update_assessment_modal[0] || {};

  const titleDefaultValue = activeAssessment ? activeAssessment.title : '';
  const descriptionDefaultValue = activeAssessment
    ? activeAssessment.description
    : '';

  // const createAssessment = async (e, formState) => {
  //   e.preventDefault();
  //   const { title, description } = formState;
  //   const { user_id } = appData.user;

  //   if (title && description) {
  //     try {
  //       await createAssessmentMutation({
  //         variables: {
  //           user_id,
  //           title,
  //           description,
  //         },
  //         refetchQueries: [
  //           {
  //             query: ASSESSMENTS,
  //             variables: { user_id },
  //           },
  //         ],
  //       });

  //       setCreateAssessmentModalOpen(false);
  //       setCreateAssessmentError('');
  //     } catch (error) {
  //       setCreateAssessmentError(
  //         error?.message?.indexOf('unique') > -1
  //           ? errors?.choose_a_unique_title
  //           : (errors?.general ?? 'Something went wrong'),
  //       );
  //     }
  //   } else {
  //     setCreateAssessmentError(
  //       errors?.save_assessement ?? "Couldn't save assessment",
  //     );
  //   }
  // };

  // const updateAssessment = async (e, formState) => {
  //   e.preventDefault();
  //   const { title, description } = formState;
  //   const { user_id } = appData.user;
  //   const url_alias = title.replace(/ /g, '-').toLowerCase();

  //   if (title && description) {
  //     try {
  //       await updateAssessmentMutation({
  //         variables: {
  //           user_id,
  //           url_alias,
  //           title,
  //           description,
  //         },
  //         refetchQueries: [
  //           {
  //             query: ASSESSMENTS,
  //             variables: { user_id },
  //           },
  //         ],
  //       });

  //       setCreateAssessmentModalOpen(false);
  //       setCreateAssessmentError('');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <Modal
      title={activeAssessment ? (updateTitle ?? '') : (createTitle ?? '')}
      description={
        activeAssessment ? (updateDescription ?? '') : (createDescription ?? '')
      }
    >
      <Form
        error={createAssessmentError !== '' ? true : false}
        message={createAssessmentError}
        // submit={{
        //   label: activeAssessment ? (updateSubmitLabel ?? '') : (createSubmitLabel ?? ''),
        //   handler: activeAssessment
        //     ? (e, formState) => updateAssessment(e, formState)
        //     : (e, formState) => createAssessment(e, formState),
        // }}
      >
        <Form.TextInput
          id="title"
          label={title_field_label ?? ''}
          defaultValue={titleDefaultValue}
          required
          disabled={!!activeAssessment}
          onChange={() => console.log('hello')}
        />
        <Form.TextArea
          label={description_field_label ?? ''}
          defaultValue={descriptionDefaultValue}
          placeholder={description_field_placeholder ?? ''}
          maxLength={4000}
          required
          disabled={!!activeAssessment}
          onChange={() => console.log('hello')}
        />
      </Form>
    </Modal>
  );
};

export default CreateAssessmentForm;
