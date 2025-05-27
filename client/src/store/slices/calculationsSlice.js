import { createSlice } from "@reduxjs/toolkit";

const calculationsSlice = createSlice({
    name: "calculations",
    initialState: {
        all: [],
        current: null,
    },
    reducers: {
        setAllCalculations: (state, { payload }) => {
            state.all = payload;
        },
        setCurrentCalculation: (state, { payload }) => {
            if (typeof payload === "string") {
                state.current = state.all.find(c => c._id == payload);
            } else {
                state.current = payload;
            }
        },
        addNewCalculation: (state, { payload }) => {
            state.all.unshift(payload);
        },
        deleteOneCalculation: (state, { payload }) => {
            state.all = state.all.filter(c => c._id !== payload);
        },
    }
});

export const { setAllCalculations, setCurrentCalculation, addNewCalculation, deleteOneCalculation } = calculationsSlice.actions;

export default calculationsSlice.reducer;