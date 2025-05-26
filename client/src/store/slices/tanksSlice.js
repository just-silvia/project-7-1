import { createSlice } from "@reduxjs/toolkit";

const tanksSlice = createSlice({
    name: "tanks",
    initialState: {
        all: [],
    },
    reducers: {
        setAllTanks: (state, { payload }) => {
            state.all = payload;
        },
        addNewTank: (state, { payload }) => {
            state.all.unshift(payload);
        },
        deleteOneTank: (state, { payload }) => {
            state.all = state.all.filter(c => c._id !== payload);
        },
    }
});

export const { setAllTanks, addNewTank, deleteOneTank } = tanksSlice.actions;

export default tanksSlice.reducer;