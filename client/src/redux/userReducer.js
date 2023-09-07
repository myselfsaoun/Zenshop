import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        isError: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.isError = false;
        },
        loginSuccessful: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isError = false;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        logout: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.isError = false;
        }
    }
})

export const {
    loginStart,
    loginSuccessful,
    loginFailure,
    logout
} = userSlice.actions;
export default userSlice.reducer;
