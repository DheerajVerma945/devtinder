import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../assets/baseUrl";

const initialState = {
  userDoc: null,
  error: null,
  requestDoc: null,
};

export const profileThunk = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}profile/view`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "User needs to be logged in"
      );
    }
  }
);

export const requestsThunk = createAsyncThunk(
  "user/requests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}user/requests/recieved`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.resposne?.data?.error || "Unable to fetch requests at the moment"
      );
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(profileThunk.fulfilled, (state, action) => {
        state.userDoc = action.payload;
        state.error = null;
      })
      .addCase(profileThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(requestsThunk.fulfilled, (state, action) => {
        state.requestDoc = action.payload;
        state.error = null;
      })
      .addCase(requestsThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
