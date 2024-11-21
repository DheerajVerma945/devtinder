import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../assets/baseUrl";
import axios from "axios";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ emailId, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}login`,
        { emailId, password },
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "An error occurred during login"
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}logout`,
        {},
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "An error occurred during logout"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
