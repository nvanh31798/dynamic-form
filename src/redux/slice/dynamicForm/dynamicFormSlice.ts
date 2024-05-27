import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormModel } from "../../../types/dynamic-form/Form";
import { fetchDynamicForm } from "../../thunks/fetchDynamicFormThunk";
import { ActionStatusEnum } from "../../../types/ActionStatusEnum";

export interface DynamicFormState {
  dymaicForm: FormModel;
  isFormOpen: boolean;
  fetchStatus: ActionStatusEnum;
}

const initialState: DynamicFormState = {
  dymaicForm: {} as FormModel,
  isFormOpen: false,
  fetchStatus: ActionStatusEnum.Idle,
};

export const dynamicFormSlice = createSlice({
  name: "dynamicForm",
  initialState,
  reducers: {
    openForm: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDynamicForm.pending, (state) => {
      state.fetchStatus = ActionStatusEnum.Pending;
    });
    builder.addCase(fetchDynamicForm.rejected, (state) => {
      state.fetchStatus = ActionStatusEnum.Failed;
    });
    builder.addCase(fetchDynamicForm.fulfilled, (state, action) => {
      state.fetchStatus = ActionStatusEnum.Success;
      state.dymaicForm = action.payload;
    });
  },
});

export const { openForm } = dynamicFormSlice.actions;
export default dynamicFormSlice.reducer;
