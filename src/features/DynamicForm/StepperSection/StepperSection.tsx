import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StepModel } from "../../../types/dynamic-form/Form";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FornFields } from "../Fields/FornFields";
import {
  Button,
  StepConnector,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { useValidation } from "../hooks/useValidation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import _ from "lodash";
import { StepperConnector } from "../../../components/StepperConnector/StepperConnector";

interface StepperSectionProps {
  showReceipts?: boolean;
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
  showReceipts,
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

  const getReceipt = () => {
    if (!!currentStep || !showReceipts) {
      return <></>;
    }
    return (
      <div className="bg-green-50 w-full flex p-5 gap-5 items-center">
        <CheckCircleOutlineIcon fontSize="small" color="success" />
        <div className="">
          <h1 className="font-bold text-xl text-green-800 mb-2">
            New Insurance Policy Registration Successfully!!!
          </h1>
          <p className="text-sm font-thin	">
            Total fee of the policy is:{" "}
            <span className="font-bold text-green-800">1100</span>
          </p>
        </div>
      </div>
    );
  };

  const handleNextStep = (errors?: void | FormikErrors<{}>) => {
    if (!_.isEmpty(errors)) {
      return;
    }
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
    if (!showReceipts) {
      return;
    }
    handleNextStep();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} connector={<StepperConnector />}>
        {steps.map((step, index) => {
          return (
            <Step key={`${step.id}-${index}`}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
        {showReceipts && (
          <Step>
            <StepLabel>Done</StepLabel>
          </Step>
        )}
      </Stepper>
      <div className="mt-10 p-5 shadow-md">
        {steps[activeStep]?.title && (
          <h1 className="text-xl font-semibold mt-2">
            {steps[activeStep].title}
          </h1>
        )}
        <div className="mt-5 flex flex-wrap gap-10 justify-evenly">
          {getStepConntent()}
          {getReceipt()}
        </div>
        <div className="flex flex-row-reverse gap-5 mt-10">
          {activeStep < steps.length - 1 && (
            <Button
              onClick={() => setStepFieldTouched(true, handleNextStep)}
              variant="contained"
            >
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
          {activeStep > 0 && activeStep < steps.length && (
            <Button onClick={() => handleBackStep()} variant="outlined">
              Back
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};
