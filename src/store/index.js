import { configureStore } from "@reduxjs/toolkit";
import GuestSlice from "./GuestsSlice";

const store = configureStore({
    reducer : {
        guests : GuestSlice.reducer
    }
})


export default store