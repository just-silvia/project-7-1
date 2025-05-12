import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
    }
})

/* 
const state = {
    auth: { // slice
        user: null,
        token: null
    },
    tanks: { // slice
        all: []
    },
    lights: { // slice
        all: []
    },
    plants: { // slice
        all: []
    },
    settings: { // slice
        darkMode: false,
        // ...
    }
}
*/