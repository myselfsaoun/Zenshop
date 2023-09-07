import axios from "axios";

const REACT_APP_API_URL = "https://zenshop.vercel.app/api";
// const REACT_APP_API_URL = "http://localhost:4500/api";

        
export const publicRequest = axios.create({
    baseURL: REACT_APP_API_URL,
});

export const userRequest = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: JSON.parse(localStorage.getItem("persist:root"))?.user && {token: `Bearer ${
        JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.token
    }`}
});

