import { FieldType } from "./FieldType";

export interface ValidationRules {
  required?: boolean;
  regex?: string;
  max?: number;
  min?: number;
}

export interface Field {
  id: string;
  fieldType: FieldType;
  fieldCode?: string;
  label?: string;
  validationRules?: ValidationRules;
}
