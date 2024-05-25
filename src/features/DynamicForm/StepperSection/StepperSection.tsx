import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StepModel } from "../../../types/dynamic-form/Form";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FornFields } from "../Fields/FornFields";
import { Button } from "@mui/material";
import { FormikErrors } from "formik";
import { useValidation } from "../hooks/useValidation";

interface StepperSectionProps {
  steps: StepModel[];
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isValid?: boolean;
  errors: FormikErrors<{}>;
  setValidationSchema?: Dispatch<SetStateAction<{}>>;
}

export const StepperSection = ({
  steps,
  onSubmit,
  setValidationSchema,
  errors,
  isValid,
  ...props
}: StepperSectionProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];
  const { getValidationsSchemaFromField } = useValidation();

  useEffect(() => {
    const validationSchema = getValidationsSchemaFromField(currentStep.fields);
    setValidationSchema?.(validationSchema);
  }, [activeStep]);

  const getStepConntent = () => {
    if (!currentStep) {
      return <></>;
    }
    return currentStep?.fields.map((field) => (
      <FornFields {...props} field={field} />
    ));
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
              onClick={() => onSubmit?.()}
              variant="contained"
            >
              Save
            </Button>
          )}
          {activeStep > 0 && (
            <Button
              onClick={() => setActiveStep(activeStep - 1)}
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
