import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchForm } from "../slice/dynamicForm/dynamicFormApi";
import { FormModel } from "../../types/dynamic-form/Form";

export const fetchDynamicForm = createAsyncThunk<FormModel, { id?: number }>(
  "dynamicForm/fetchDynamicForm",
  async ({ id }, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue("Can not find dynamic form id");
    }
    const response = await fetchForm(id);
    if (!response) {
      return rejectWithValue("Failed to fetch dynamic form");
    }

    return response;
  }
);
