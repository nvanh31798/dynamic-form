import React from "react";
import { Field } from "../../../types/dynamic-form/Field";
import { FieldType } from "../../../types/dynamic-form/FieldType";
import { TableFieldModel } from "../../../types/dynamic-form/TableField";
import { TableField } from "../TableField/TableField";
import { InputFieldModel } from "../../../types/dynamic-form/InputField";
import { InputField } from "../InputField/InputField";

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
    case FieldType.CHECKBOX:
    case FieldType.DATE:
    case FieldType.TEXT:
    case FieldType.DROPDOWN:
    case FieldType.NUMBER:
      return <></>;
  }
  return <></>;
};
