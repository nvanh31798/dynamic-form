import { Field } from "./Field";

interface CheckBoxValueModel {
  id: string;
  label: string;
  helperText?: string;
  checked: boolean;
  disabled: boolean;
}

export interface CheckBoxFieldModel extends Field {
  title?: string;
  checkboxValues: CheckBoxValueModel[];
}

