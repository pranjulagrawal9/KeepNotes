import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./slices/notesSlice";

export const store= configureStore({
    reducer: {
        notesReducer: notesSlice
    }
})