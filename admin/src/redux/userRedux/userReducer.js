import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false,
        error: false
    },
    reducers: {
        // get all users
        getUserStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        getUserSuccessful: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        getUserFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // delete user
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        deleteUserSuccessful: (state, action) => {
            state.loading = false;
            state.users.splice(
                state.users.findIndex(item => item._id === action.payload),
                1
            )
        },
        deleteUserFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // update user
        updateUserStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        updateUserSuccessful: (state, action) => {
            state.loading = false;
            const index = state.users.findIndex(item => item._id === action.payload.id);
            state.users[index] = action.payload.user;
        },
        updateUserFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // add user
        addUserStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        addUserSuccessful: (state, action) => {
            state.loading = false;
            state.users.push(action.payload.user);
        },
        addUserFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // after logout
        userInitialize: (state) => {
            state.users = null
        }
    }
})

export const {
    getUserStart,
    getUserSuccessful,
    getUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccessful,
    updateUserFailure,
    updateUserStart,
    updateUserSuccessful,
    addUserFailure,
    addUserStart,
    addUserSuccessful,
    userInitialize
} = userSlice.actions;
export default userSlice.reducer;
