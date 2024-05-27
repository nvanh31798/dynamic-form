import * as PolicyForm01 from "../../../mocks/PolicyForm.json";
import * as PolicyForm02 from "../../../mocks/PolicyForm-2.json";
import { FormModel } from "../../../types/dynamic-form/Form";

export function fetchForm(id: number) {
  if (id === 1) {
    return new Promise<FormModel>((resolve) =>
      setTimeout(() => resolve(PolicyForm01 as FormModel), 200)
    );
  }
  if (id === 2) {
    return new Promise<FormModel>((resolve) =>
      setTimeout(() => resolve(PolicyForm02 as FormModel), 200)
    );
  }
  return new Promise<FormModel>((resolve) =>
    setTimeout(() => resolve({} as FormModel), 200)
  );
}
