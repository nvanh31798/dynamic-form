import React, { useEffect, useState } from "react";
import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import { SectionType } from "../../../types/dynamic-form/SectionType";
import { FormModel, SectionModel } from "../../../types/dynamic-form/Form";
import { StepperSection } from "../StepperSection/StepperSection";
import { ActionStatusEnum } from "../../../types/ActionStatusEnum";
import { Box, CircularProgress } from "@mui/material";
import * as Yup from "yup";
import _ from "lodash";

export interface DynamicFormProps {
  dynamicForm: FormModel;
  fetchStatus: ActionStatusEnum;
}

export const DynamicForm = ({ dynamicForm, fetchStatus }: DynamicFormProps) => {
  const [validationSchema, setValidationSchema] = useState({});

  const sections = dynamicForm.sections as SectionModel[];

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
    return sections?.map((section) => {
      switch (section.type) {
        case SectionType.STEPPER:
          return (
            <StepperSection
              validationForm={validationForm}
              onBlur={handleBlur}
              onChange={handleChange}
              onSubmit={handleSubmit}
              steps={section.steps ?? []}
              showReceipts={section.showReceipt}
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

  if (fetchStatus === ActionStatusEnum.Pending) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (fetchStatus === ActionStatusEnum.Failed) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Failed!
      </Box>
    );
  }

  return (
    <Formik
      validateOnChange
      validateOnBlur
      initialValues={{}}
      onSubmit={(values) => {
        console.log("values");
      }}
      validationSchema={
        _.isEmpty(validationSchema) ? Yup.object().shape({}) : validationSchema
      }
    >
      {({
        isValid,
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
