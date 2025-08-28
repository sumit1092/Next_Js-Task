import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";
import uiReducer from "./slices/uiSlice";
import { injectStore } from "./storeInstance";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    ui: uiReducer,
  },
});

injectStore(store);
