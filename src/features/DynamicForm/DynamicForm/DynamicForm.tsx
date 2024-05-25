import React, { useState } from "react";
import { Form, Formik, FormikErrors } from "formik";
import { SectionType } from "../../../types/dynamic-form/SectionType";
import * as PolicyForm from "../../../mocks/PolicyForm.json";
import { FormModel, SectionModel } from "../../../types/dynamic-form/Form";
import { StepperSection } from "../StepperSection/StepperSection";

export const DynamicForm = () => {
  const policyForm: FormModel = PolicyForm as FormModel;
  const sections = policyForm.sections as SectionModel[];
  const [validationSchema, setValidationSchema] = useState({});

  const renderSection = (
    handleBlur: (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
    handleChange: (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
    isValid: boolean,
    errors: FormikErrors<{}>
  ) => {
    return sections.map((section) => {
      switch (section.type) {
        case SectionType.STEPPER:
          return (
            <StepperSection
              onBlur={handleBlur}
              onChange={handleChange}
              onSubmit={handleSubmit}
              steps={section.steps ?? []}
              isValid={isValid}
              errors={errors}
              setValidationSchema={setValidationSchema}
            />
          );
        case SectionType.CONTENT:
          return <></>;
        default:
          return <></>;
      }
    });
  };
  return (
    <Formik
      validateOnChange
      validateOnBlur
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {({
        isValid,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Form className="flex-auto">
          {renderSection(
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            errors
          )}
        </Form>
      )}
    </Formik>
  );
};
