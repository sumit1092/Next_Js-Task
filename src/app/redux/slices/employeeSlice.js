import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/services/api";
import { GET_EMPLOYEE, ADD_EMPLOYEE, FILTER } from "@/app/utility/apiEndPoint";
import { showToast } from "./uiSlice";

export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_EMPLOYEE);
      return response.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employee, thunkAPI) => {
    try {
      const response = await api.post(ADD_EMPLOYEE, employee);
      thunkAPI.dispatch(
        showToast({ message: "Employee added successfully!", type: "success" })
      );
      return response.data;
    } catch (err) {
      thunkAPI.dispatch(
        showToast({ message: "Failed to add employee", type: "error" })
      );
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const filterEmployees = createAsyncThunk(
  "employees/filter",
  async (filters, thunkAPI) => {
    try {
      const response = await api.get(FILTER, { params: filters });
      thunkAPI.dispatch(
        showToast({ message: "Filter applied successfully!", type: "success" })
      );
      return response.data;
    } catch (err) {
      thunkAPI.dispatch(
        showToast({ message: "Failed to filter employees", type: "error" })
      );
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: { list: [], dropdowns: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.employees || [];
        state.dropdowns = action.payload.dropdowns || {};
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(filterEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(filterEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
