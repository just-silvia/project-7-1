import { createSlice, current } from "@reduxjs/toolkit";

const lightsSlice = createSlice({
    name: "lights",
    initialState: {
        all: [],
        current: null,
    },
    reducers: {
        setAllLights: (state, { payload }) => {
            state.all = payload;
        },
        setCurrentLight: (state, { payload }) => {
            if (typeof payload === "string") {
                state.current = state.all.find(c => c._id == payload);
            } else {
                state.current = payload;
            }
        },
        addNewLight: (state, { payload }) => {
            state.all.unshift(payload);
        },
        deleteOneLight: (state, { payload }) => {
            state.all = state.all.filter(c => c._id !== payload);
        },
    }
});

export const { setAllLights, setCurrentLight, addNewLight, deleteOneLight } = lightsSlice.actions;

export default lightsSlice.reducer;