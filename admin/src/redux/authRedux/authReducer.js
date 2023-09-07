import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "admin",
    initialState: {
        currentUser: null,
        loading: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccessful: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null
        }
    }
})

export const {
    loginStart, 
    loginSuccessful, 
    loginFailure,
    logout
} = authSlice.actions;
export default authSlice.reducer;
