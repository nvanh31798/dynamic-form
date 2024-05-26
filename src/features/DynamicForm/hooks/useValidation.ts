import { Field } from "../../../types/dynamic-form/Field";
import * as Yup from "yup";
import { FieldType } from "../../../types/dynamic-form/FieldType";
import moment from "moment";

export const useValidation = () => {
  const getValidationsSchemaFromField = (fields: Field[]) => {
    const validationObj = {} as { [key: string]: any };
    fields?.forEach((field) => {
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
        if (field.validationRules.minDate) {
          fieldSchema = fieldSchema.test(
            "minDate",
            `Date must before ${moment(
              field.validationRules.minDate,
              "DD/MM/YYYY"
            ).format("LL")}`,
            (value) => {
              const minDate = moment(
                field.validationRules?.minDate,
                "DD/MM/YYYY"
              );
              return moment(value).isAfter(minDate);
            }
          );
        }

        if (field.validationRules.maxDate) {
          fieldSchema = fieldSchema.test(
            "maxDate",
            `Date must before ${moment(
              field.validationRules.maxDate,
              "DD/MM/YYYY"
            ).format("LL")}`,
            (value) => {
              const maxDate = moment(
                field.validationRules?.maxDate,
                "DD/MM/YYYY"
              );
              return moment(value).isBefore(maxDate);
            }
          );
        }

        validationObj[fieldName] = fieldSchema;
      }
    });
    return Yup.object().shape(validationObj);
  };

  return { getValidationsSchemaFromField };
};
