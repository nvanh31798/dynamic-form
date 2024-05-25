import { Field } from "../../../types/dynamic-form/Field";
import * as Yup from "yup";

export const useValidation = () => {
  const getValidationsSchemaFromField = (fields: Field[]) => {
    const validationObj = {} as { [key: string]: any };
    fields.forEach((field) => {
      const fieldName = field.fieldCode ?? "";
      if (field.validationRules) {
        let fieldSchema = Yup.string();
        if (field.validationRules.required) {
          fieldSchema = fieldSchema.required(`${field.label} is required!`);
        }
        if (field.validationRules.max) {
          fieldSchema = fieldSchema.max(field.validationRules.max, `Too long!`);
        }
        if (field.validationRules.min) {
          fieldSchema = fieldSchema.min(
            field.validationRules.min,
            `Too short!`
          );
        }

        validationObj[fieldName] = fieldSchema;
      }
    });
    console.log(validationObj);
    return Yup.object().shape(validationObj);
  };

  return { getValidationsSchemaFromField };
};
