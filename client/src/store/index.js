import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import settingsSlice from "./slices/settingsSlice";
import consultanciesSlice from "./slices/consultanciesSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        settings: settingsSlice,
        consultancies: consultanciesSlice,
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