import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import cartSlice from "./cartSlice";
const store = configureStore({
    reducer:{
        cart: cartSlice,
        apiData: apiSlice,

    }
})
export default store;