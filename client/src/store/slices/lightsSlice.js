import { createSlice } from "@reduxjs/toolkit";

const lightsSlice = createSlice({
    name: "light",
    initialState: {
        all: [],
    },
    reducers: {
        setAllLights: (state, { payload }) => {
            state.all = payload;
        },
        addNewLight: (state, { payload }) => {
            state.all.unshift(payload);
        },
        deleteOneLight: (state, { payload }) => {
            state.all = state.all.filter(c => c._id !== payload);
        },
    }
});

export const { setAllLights, addNewLight, deleteOneLight } = lightsSlice.actions;

export default lightsSlice.reducer;