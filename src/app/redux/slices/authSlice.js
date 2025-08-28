import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/services/api";
import { LOGIN } from "@/app/utility/apiEndPoint";

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
    const response = await api.post(LOGIN, credentials);

    const { jwtToken: token, refreshToken, ...rest } = response.data.data;

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }

    return { user: rest, token, refreshToken };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
