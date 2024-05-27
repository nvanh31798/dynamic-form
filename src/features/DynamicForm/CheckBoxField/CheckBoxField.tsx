import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useField } from "formik";
import React, { useEffect } from "react";
import { CheckBoxFieldModel } from "../../../types/dynamic-form/CheckBoxField";

interface DropDownFieldProps {
  field: CheckBoxFieldModel;
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CheckBoxField = ({ field }: DropDownFieldProps) => {
  const [, meta, helpers] = useField(field?.fieldCode ?? "");
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = event.target;
    let newValueArray;
  
    if (checked) {
      // Add the id of the checkbox to the array if it's checked
      newValueArray = Array.isArray(value) ? [...value, id] : [id];
    } else {
      // Remove the id of the checkbox from the array if it's unchecked
      newValueArray = Array.isArray(value) ? value.filter(item => item !== id) : [];
    }
  
    setValue(newValueArray); // Update Formik's state
  };
  

  const renderCheckboxValues = () => {
    return field.checkboxValues.map((checkboxValue) => (
      <FormControlLabel
        className="mb-4"
        control={
          <Checkbox
            onClick={(e) => console.log(e.target)}
            required={field.validationRules?.required}
            defaultChecked={checkboxValue.checked}
            id={checkboxValue.id}
            name={field?.fieldCode}
            disabled={checkboxValue.disabled}
            onChange={handleChange}
          />
        }
        label={
          <div className="ml-1">
            <p className="text-sm">{checkboxValue.label}</p>
            <p className="mt-1 text-slate-400 text-xs font-[50]">
              {checkboxValue.helperText}
            </p>
          </div>
        }
      />
    ));
  };

  useEffect(() => {
    if (!field.prefilled) {
      return;
    }
    setValue(field.prefilled);
  }, []);

  return (
    <div className="grow w-full">
      <h1 className="mb-3 font-bold text-xl">{field.title}</h1>
      <FormGroup className="pl-5">{renderCheckboxValues()}</FormGroup>
    </div>
  );
};
