import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/leaderboard/`;

const initialState = {
    leaderboard: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Get leaderboard
export const getLeaderboard = createAsyncThunk(
    'leaderboard/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLeaderboard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeaderboard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leaderboard = action.payload;
            })
            .addCase(getLeaderboard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default leaderboardSlice.reducer;
