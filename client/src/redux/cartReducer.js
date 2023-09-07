import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState : {
        products: []
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        updateCart: (state, action) => {
            const index = state.products.findIndex(item => item.id === action.payload.product.id);
            state.products[index] = action.payload.product;
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload.id)
        },
        resetCart: (state) => {
            state.products = []
        },
    },
});

export const { 
    addToCart, updateCart,
    removeItem, resetCart
 } = cartSlice.actions;

export default cartSlice.reducer;