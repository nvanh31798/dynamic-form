import React from "react";
import { InputFieldModel } from "../../../types/dynamic-form/InputField";
import { TextField } from "@mui/material";
import { useField } from "formik";

interface InputFieldProps {
  field: InputFieldModel;
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InputField = ({ field, onChange, onBlur }: InputFieldProps) => {
  const [formfield, meta, helpers] = useField(field?.fieldCode ?? "");
  const { value, error, touched } = meta;

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange?.(e);
  };

  const handleblur = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onBlur?.(e);
  };
  return (
    <TextField
      error={!!error && touched}
      helperText={touched && error}
      onChange={(e) => handleChange(e)}
      onBlur={(e) => handleblur(e)}
      sx={{ minWidth: "300px" }}
      value={value}
      className="min-w-96 grow"
      name={field.fieldCode}
      label={field.label}
      id={field.id}
      required={field.validationRules?.required}
      variant="outlined"
    />
  );
};
