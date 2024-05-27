import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormModel } from "../../../types/dynamic-form/Form";

export interface DynamicFormState {
  dymaicForm: FormModel;
  isFormOpen: boolean;
}

const initialState: DynamicFormState = {
  dymaicForm: {} as FormModel,
  isFormOpen: false,
};

export const dynamicFormSlice = createSlice({
  name: "dynamicForm",
  initialState,
  reducers: {
    // updateTodo: (state, action: PayloadAction<TodoModel>) => {
    //   state.todoList = state.todoList.map((todo) =>
    //     todo.id === action.payload.id ? action.payload : todo
    //   );
    // },
    openForm: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },
  },

  extraReducers: () => {},
});

export const { openForm } = dynamicFormSlice.actions;
export default dynamicFormSlice.reducer;
