import React from "react";
import { Field } from "../../../types/dynamic-form/Field";
import { FieldType } from "../../../types/dynamic-form/FieldType";
import { TableFieldModel } from "../../../types/dynamic-form/TableField";
import { TableField } from "../TableField/TableField";
import { InputFieldModel } from "../../../types/dynamic-form/InputField";
import { InputField } from "../InputField/InputField";
import { DatePickerField } from "../../../components/DatePickerField/DatePickerField";
import { DropDownField } from "../../../components/DropDownField/DropDownField";
import { DropdownFieldModel } from "../../../types/dynamic-form/DropdownField";
import { CheckBoxFieldModel } from "../../../types/dynamic-form/CheckBoxField";
import { CheckBoxField } from "../CheckBoxField/CheckBoxField";

interface FornFieldsProps {
  field: Field;
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const FornFields = ({ field, ...props }: FornFieldsProps) => {
  switch (field.fieldType) {
    case FieldType.TABLE:
      const tableField = field as TableFieldModel;
      return <TableField field={tableField} />;

    case FieldType.INPUT:
      const inputField = field as InputFieldModel;
      return <InputField {...props} field={inputField} />;
    case FieldType.DATEPICKER:
      return <DatePickerField {...props} field={field} />;
    case FieldType.DROPDOWN:
      const dropdownField = field as DropdownFieldModel;
      return <DropDownField {...props} field={dropdownField} />;
    case FieldType.CHECKBOX:
      const checkboxField = field as CheckBoxFieldModel;
      return <CheckBoxField {...props} field={checkboxField} />;
    case FieldType.TEXT:
    case FieldType.NUMBER:
      return <></>;
  }
  return <></>;
};
