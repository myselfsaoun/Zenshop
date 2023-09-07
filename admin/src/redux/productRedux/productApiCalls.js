import { publicRequest, userRequest } from "../../utils/makeRequest";
import {
    getProductStart, getProductSuccessful, getProductFailure,
    deleteProductFailure, deleteProductStart, deleteProductSuccessful,
    updateProductFailure, updateProductStart, updateProductSuccessful,
    addProductFailure, addProductStart, addProductSuccessful
} from './productReducer';


// add product
export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart());
    try{   
        const res = await userRequest.post("/products", product)
        dispatch(addProductSuccessful(res.data));
    } catch(err) {
        dispatch(addProductFailure());
    }
}

// get product
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get("/products/all?new=true"); 
        dispatch(getProductSuccessful(res.data));
    } catch(err) {
        dispatch(getProductFailure());
    }
}

// update product
export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart());
    try{   
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccessful({id, product}));
    } catch(err) {
        dispatch(updateProductFailure());
    }
}

// delete product
export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());
    try{
        await userRequest.delete(`/products/${id}`);     
        dispatch(deleteProductSuccessful(id));
    } catch(err) {
        dispatch(deleteProductFailure());
    }
}
