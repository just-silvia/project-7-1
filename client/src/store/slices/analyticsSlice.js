import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
    name: "analytics",
    initialState: {
        tanks: [],
        history: {},
        activities: [],
    },
    reducers: {
    }
});

export const { } = analyticsSlice.actions;

export default analyticsSlice.reducer;