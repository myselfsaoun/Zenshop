import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "admin",
    initialState: {
        currentUser: null,
        loading: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = false;
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
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
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
