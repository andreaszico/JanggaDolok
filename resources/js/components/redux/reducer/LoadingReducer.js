import {
    createSlice
} from '@reduxjs/toolkit';

export const LoadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
       setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        }

    },
});

export const {
   setLoading
} = LoadingSlice.actions;

export const selectLoading = (state) => state.isLoading;

export default LoadingSlice.reducer;