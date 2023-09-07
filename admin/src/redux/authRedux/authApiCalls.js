import { publicRequest } from "../../utils/makeRequest";

import {
    loginStart, loginSuccessful, 
    loginFailure
} from './authReducer';


// login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);  
        dispatch(loginSuccessful(res.data));
    } catch(err) {
        dispatch(loginFailure());
    }
}

// logout
// export const logout = async (dispatch) => {
//     dispatch(logout());
// }
