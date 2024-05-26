import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StepModel } from "../../../types/dynamic-form/Form";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FornFields } from "../Fields/FornFields";
import { Button } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { useValidation } from "../hooks/useValidation";
import _ from "lodash";

interface StepperSectionProps {
  steps: StepModel[];
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isValid?: boolean;
  setValidationSchema?: Dispatch<SetStateAction<{}>>;
  validationForm?: (values?: any) => void;
  setTouched?: (
    touched: FormikTouched<{}>,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<{}>>;
}

export const StepperSection = ({
  steps,
  onSubmit,
  setValidationSchema,
  validationForm,
  isValid,
  setTouched,
  ...props
}: StepperSectionProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];
  const { getValidationsSchemaFromField } = useValidation();

  const setStepFieldTouched = (
    touched: boolean,
    callback?: (errors?: void | FormikErrors<{}>) => void
  ) => {
    const currentFieldsTouched = currentStep.fields?.map((field) => {
      return [field.fieldCode as string, touched];
    });
    setTouched?.(Object.fromEntries(currentFieldsTouched), true).then(
      (errors) => callback?.(errors)
    );
  };

  useEffect(() => {
    const validationSchema = getValidationsSchemaFromField(currentStep?.fields);
    setValidationSchema?.(validationSchema);
  }, [activeStep]);

  const getStepConntent = () => {
    if (!currentStep) {
      return <></>;
    }
    return currentStep?.fields?.map((field) => (
      <FornFields {...props} field={field} />
    ));
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (errors?: void | FormikErrors<{}>) => {
    if (!_.isEmpty(errors)) {
      return;
    }
    onSubmit?.();
    handleNextStep();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={`${step.id}-${index}`}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
        <Step>
          <StepLabel>Done</StepLabel>
        </Step>
      </Stepper>
      <div className="mt-10 p-5 shadow-md">
        {steps[activeStep]?.title && (
          <h1 className="text-xl font-semibold mt-2">
            {steps[activeStep].title}
          </h1>
        )}
        <div className="mt-5 flex flex-wrap gap-10 justify-evenly">
          {getStepConntent()}
        </div>
        <div className="flex flex-row-reverse gap-5 mt-10">
          {activeStep !== steps.length - 1 && (
            <Button onClick={() => handleNextStep()} variant="contained">
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button
              disabled={!isValid}
              onClick={() => {
                setStepFieldTouched(true, handleSubmit);
              }}
              variant="contained"
            >
              Save
            </Button>
          )}
          {activeStep > 0 && (
            <Button
              onClick={() => handleBackStep()}
              color={"error"}
              variant="contained"
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};
