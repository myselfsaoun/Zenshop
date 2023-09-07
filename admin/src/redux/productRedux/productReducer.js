import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: false,
        error: false
    },
    reducers: {
        // get all products
        getProductStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        getProductSuccessful: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        getProductFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // delete product
        deleteProductStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        deleteProductSuccessful: (state, action) => {
            state.loading = false;
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload),
                1
            )
        },
        deleteProductFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // update product
        updateProductStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        updateProductSuccessful: (state, action) => {
            state.loading = false;           
            const index = state.products.findIndex(item => item._id === action.payload.id);
            state.products[index] = action.payload.product;
        },
        updateProductFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // add product
        addProductStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        addProductSuccessful: (state, action) => {
            state.loading = false;        
            state.products.push(action.payload.savedProduct);
        },
        addProductFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        // after logout
        productInitialize: (state) => {
            state.products = null
        }
    }
})

export const {
    getProductStart,
    getProductSuccessful,
    getProductFailure,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccessful,
    updateProductFailure,
    updateProductStart,
    updateProductSuccessful,
    addProductFailure,
    addProductStart,
    addProductSuccessful,
    productInitialize
} = productSlice.actions;
export default productSlice.reducer;
