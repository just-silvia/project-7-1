import { createSlice } from "@reduxjs/toolkit";

const consultanciesSlice = createSlice({
    name: "consultancies",
    initialState: {
        all: [],
    },
    reducers: {
        setAllConsultancies: (state, { payload }) => {
            state.all = payload;
        },
        addNewConsultancy: (state, { payload }) => {
            state.all.unshift(payload);
        },
        deleteOneConsultancy: (state, { payload }) => {
            state.all = state.all.filter(c => c._id !== payload);
        },
    }
});

export const { setAllConsultancies, addNewConsultancy, deleteOneConsultancy } = consultanciesSlice.actions;

export default consultanciesSlice.reducer;