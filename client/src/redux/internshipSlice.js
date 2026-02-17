import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    internships: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Post internship
export const postInternship = createAsyncThunk(
    'internships/post',
    async (internshipData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post('http://localhost:5000/api/internships', internshipData, config);
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

// Get internships
export const getInternships = createAsyncThunk(
    'internships/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/internships');
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

export const internshipSlice = createSlice({
    name: 'internship',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(postInternship.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postInternship.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.internships.unshift(action.payload);
            })
            .addCase(postInternship.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getInternships.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInternships.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.internships = action.payload;
            })
            .addCase(getInternships.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = internshipSlice.actions;
export default internshipSlice.reducer;
