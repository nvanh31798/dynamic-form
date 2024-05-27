import { useEffect } from "react";
import { useField } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { DropdownFieldModel } from "../../types/dynamic-form/DropdownField";

interface DropDownFieldProps {
  field: DropdownFieldModel;
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const DropDownField = ({ field, onChange }: DropDownFieldProps) => {
  const [, meta, helpers] = useField(field?.fieldCode ?? "");
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    if (!field.prefilled) {
      return;
    }
    setValue(field.prefilled);
  }, []);

  return (
    <FormControl
      className="grow !min-w-[300px]"
      error={!!(touched && error)}
    >
      <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
      <Select
        sx={{ minWidth: 230 }}
        labelId="demo-simple-select-label"
        id={field.id}
        value={value}
        label={field.label}
        name={field.fieldCode}
        required={field.validationRules?.required}
        onChange={(e) => setValue(e.target.value as string)}
        defaultValue={field.prefilled}
      >
        {field.dropdownValues.map((value) => (
          <MenuItem value={value.id}>{value.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{touched && error}</FormHelperText>
    </FormControl>
  );
};
