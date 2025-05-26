import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import settingsSlice from "./slices/settingsSlice";
import consultanciesSlice from "./slices/consultanciesSlice";
import plantsSlice from "./slices/plantsSlice";
import tanksSlice from "./slices/tanksSlice";
import lightsSlice from "./slices/lightsSlice";
import analyticsSlice from "./slices/analyticsSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        settings: settingsSlice,
        consultancies: consultanciesSlice,
        plants: plantsSlice,
        tanks: tanksSlice,
        lights: lightsSlice,
        analytics: analyticsSlice,
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