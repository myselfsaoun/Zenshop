import { userRequest } from "../../utils/makeRequest";
import {
    // getUserStart, getUserSuccessful, getUserFailure,
    deleteUserFailure, deleteUserStart, deleteUserSuccessful,
    updateUserFailure, updateUserStart, updateUserSuccessful,
    addUserFailure, addUserStart, addUserSuccessful
} from './userReducer';


// add User
export const addUser = async (dispatch, user) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post("/users", user);
        dispatch(addUserSuccessful(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
}

// get User
// export const getUsers = async (dispatch) => {
//     dispatch(getUserStart());
//     try {
//         const res = await userRequest.get("/users/all?new=true");
//         dispatch(getUserSuccessful(res.data));
//     } catch (err) {
//         dispatch(getUserFailure());
//     }
// }

// update User
export const updateUser = async (dispatch, id, user) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/users/${id}`, user);
        // console.log("data: ", res.data);
        dispatch(updateUserSuccessful({ id, user }));
    } catch (err) {
        dispatch(updateUserFailure());
    }
}

// delete User
export const deleteUser = async (dispatch, id) => {
    dispatch(deleteUserStart());
    try {
        await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccessful(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
}
