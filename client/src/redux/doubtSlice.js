import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/doubts/`;

const initialState = {
    doubts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Ask doubt
export const askDoubt = createAsyncThunk(
    'doubts/ask',
    async (doubtData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(API_URL, doubtData, config);
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

// Get doubts
export const getDoubts = createAsyncThunk(
    'doubts/getAll',
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

// Answer doubt
export const answerDoubt = createAsyncThunk(
    'doubts/answer',
    async ({ id, text }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(`${API_URL}${id}/answer`, { text }, config);
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

export const doubtSlice = createSlice({
    name: 'doubt',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(askDoubt.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(askDoubt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doubts.unshift(action.payload);
            })
            .addCase(askDoubt.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDoubts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDoubts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doubts = action.payload;
            })
            .addCase(getDoubts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(answerDoubt.fulfilled, (state, action) => {
                const index = state.doubts.findIndex(d => d._id === action.payload._id);
                if (index !== -1) {
                    state.doubts[index] = action.payload;
                }
            })

    },
});

export const { reset } = doubtSlice.actions;
export default doubtSlice.reducer;
