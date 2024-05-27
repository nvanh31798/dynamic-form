import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dynamicFormReducer from "./slice/dynamicForm/dynamicFormSlice";

export const store = configureStore({
  reducer: {
    dynamicForm: dynamicFormReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
