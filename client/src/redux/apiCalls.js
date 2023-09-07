import {
    loginStart,
    loginFailure
} from './userReducer';
import { publicRequest, userRequest } from "../utils/makeRequest";

// register
export const register = async (user) => {
    try {
        const res = await publicRequest.post("/auth/register", user);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

// login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        // console.log(res.data);
        return res.data;
    } catch (err) {
        dispatch(loginFailure());
        return err.response.data;
    }
}

// logout
export const logout = async () => {
    try {
        const res = await publicRequest.get("/auth/logout");
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

// contact
export const sendContact = async (info) => {
    try {
        const res = await userRequest.post("/contact", info);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

// nodemail
export const sendMail = async (info) => {
    try {
        const res = await userRequest.post("/contact/mail", info);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}


// add order
// export const addOrder = async (order, dispatch) => {
//     dispatch(addOrderStart());
//     try {
//       const res = await userRequest.post(`/orders`, order);
//       dispatch(addOrderSuccess(res.data));
//     } catch (err) {
//       dispatch(addOrderFailure());
//     }
// };