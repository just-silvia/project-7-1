import { createSlice } from "@reduxjs/toolkit";

const plantsSlice = createSlice({
    name: "plants",
    initialState: {
        all: [],
    },
    reducers: {
        setAllPlants: (state, { payload }) => {
            state.all = payload;
        },
        addNewPlant: (state, { payload }) => {
            state.all.unshift(payload);
        },
        deleteOnePlant: (state, { payload }) => {
            state.all = state.all.filter(c => c._id !== payload);
        },
    }
});

export const { setAllPlants, addNewPlant, deleteOnePlant } = plantsSlice.actions;

export default plantsSlice.reducer;