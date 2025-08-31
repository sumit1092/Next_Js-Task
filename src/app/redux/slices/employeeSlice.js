import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/services/api";
import {
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  FILTER,
  GET_DATA,
  GET_COUNTRIES,
  GET_BRANCHES,
  GET_DESIGNATIONS,
  GET_ROLES,
  GET_TECHNOLOGIES,
  GET_STATE,
  GET_CITY,
} from "@/app/utility/apiEndPoint";
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

export const getData = createAsyncThunk(
  "employees/getData",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_DATA);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getCountry = createAsyncThunk(
  "employees/getCountry",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_COUNTRIES);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getStates = createAsyncThunk(
  "employees/getStates",
  async (countryId, thunkAPI) => {
    try {
      const response = await api.get(`${GET_STATE}?countryId=${countryId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getCities = createAsyncThunk(
  "employees/getCities",
  async (stateId, thunkAPI) => {
    try {
      const response = await api.get(`${GET_CITY}?stateId=${stateId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getBranch = createAsyncThunk(
  "employees/getBranch",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_BRANCHES);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getDesignation = createAsyncThunk(
  "employees/getDesignation",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_DESIGNATIONS);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getRoles = createAsyncThunk(
  "employees/getRoles",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_ROLES);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getTechnologies = createAsyncThunk(
  "employees/getTechnologies",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_TECHNOLOGIES);
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



// Slice
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

      //Get country data
      .addCase(getCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload || [];
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get states
      .addCase(getStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = (action.payload?.data || []).map((item) => ({
          value: String(item.id),
          label: item.stateName,
        }));
      })

      .addCase(getStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get cities
      .addCase(getCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = (action.payload?.data || []).map((item) => ({
          value: String(item.id),
          label: item.cityName,
        }));
      })
      .addCase(getCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get employee data
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get branch data
      .addCase(getBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload || [];
      })
      .addCase(getBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get designation data
      .addCase(getDesignation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = action.payload || [];
      })
      .addCase(getDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get roles data
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload || [];
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get technologies data
      .addCase(getTechnologies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.loading = false;
        state.technologies = action.payload || [];
      })
      .addCase(getTechnologies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get employee data
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

      // Get filtered employee data
      .addCase(filterEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || [];
        state.count = action.payload?.count || {};
      })
      .addCase(filterEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
