import React, { useState } from "react";
import { Form, Formik, FormikErrors, FormikTouched } from "formik";
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
    validationForm: (values?: any) => void,
    isValid: boolean,
    setTouched: (
      touched: FormikTouched<{}>,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{}>>
  ) => {
    return sections.map((section) => {
      switch (section.type) {
        case SectionType.STEPPER:
          return (
            <StepperSection
              validationForm={validationForm}
              onBlur={handleBlur}
              onChange={handleChange}
              onSubmit={handleSubmit}
              steps={section.steps ?? []}
              isValid={isValid}
              setTouched={setTouched}
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
        console.log("values");
      }}
      validationSchema={validationSchema}
    >
      {({
        isValid,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        validateForm,
        setTouched,
      }) => (
        <Form className="flex-auto">
          {renderSection(
            handleBlur,
            handleChange,
            handleSubmit,
            validateForm,
            isValid,
            setTouched
          )}
        </Form>
      )}
    </Formik>
  );
};
