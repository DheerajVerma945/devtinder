import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../assets/baseUrl";

const initialState = {
    userDoc: null,
    error: null,
};

export const profileThunk = createAsyncThunk(
    'user/profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseUrl}profile/view`,
                { withCredentials: true }
            );
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "An error occurred while fetching profile");
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
            });
    },
});

export default userSlice.reducer;
