import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import settingsSlice from "./slices/settingsSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        settings: settingsSlice,
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