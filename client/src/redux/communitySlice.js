import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/communities/`;

const initialState = {
    communities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create community
export const createCommunity = createAsyncThunk(
    'communities/create',
    async (communityData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(API_URL, communityData, config);
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

// Get communities
export const getCommunities = createAsyncThunk(
    'communities/getAll',
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

// Join community
export const joinCommunity = createAsyncThunk(
    'communities/join',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(`${API_URL}${id}/join`, {}, config);
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

export const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCommunity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCommunity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.communities.unshift(action.payload);
            })
            .addCase(createCommunity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCommunities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCommunities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.communities = action.payload;
            })
            .addCase(getCommunities.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(joinCommunity.fulfilled, (state, action) => {
                const index = state.communities.findIndex(c => c._id === action.payload._id);
                if (index !== -1) {
                    state.communities[index] = action.payload;
                }
            });
    },
});

export const { reset } = communitySlice.actions;
export default communitySlice.reducer;
