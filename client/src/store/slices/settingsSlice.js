import { createSlice } from "@reduxjs/toolkit";
import { memory } from "../../utilities/memory";

const settings = memory.get("settings");

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        darkMode: settings?.darkMode || false,
    },
    reducers: {
        setDarkMode: (state, { payload }) => {
            state.darkMode = payload;

            memory.set("settings", { ...state });
        },
    }
});

export const { setDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;