import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Field } from "../../types/dynamic-form/Field";
import { useField } from "formik";
import moment, { Moment } from "moment";

interface DatePickerFieldProps {
  field: Field;
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const DatePickerField = ({
  field,
  onChange,
  onBlur,
}: DatePickerFieldProps) => {
  const [, meta, helpers] = useField(field?.fieldCode ?? "");
  const { value, error, touched } = meta;
  const { setValue } = helpers;
  const handleChange = (value: Moment) => {
    if (!onChange) {
      return;
    }
    const dtUTC = moment.utc(value);

    setValue?.(dtUTC);
  };

  const handleblur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    onBlur?.(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateField
        InputProps={{
          error: !!touched && !!error,
        }}
        format="DD/MM/YYYY"
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
      />
    </LocalizationProvider>
  );
};
