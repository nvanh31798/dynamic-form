import { FieldType } from "./FieldType";

export interface ValidationRules {
  required?: boolean;
  regex?: string;
  max?: number;
  min?: number;
  minDate?: Date;
  maxDate?: Date;
}

export interface Field {
  id: string;
  fieldType: FieldType;
  fieldCode?: string;
  label?: string;
  validationRules?: ValidationRules;
  prefilled?: string;
}
