import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "",
    markAsDone: "",
    expenses: [],
    singleExpense: null,
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {

        /* ================= FILTERS ================= */
        setCategory: (state, action) => {
            state.category = action.payload;
        },

        setMarkAsDone: (state, action) => {
            state.markAsDone = action.payload;
        },

        /* ================= EXPENSE DATA ================= */
        setExpense: (state, action) => {
            state.expenses = action.payload; // ✅ correct
        },

        setSingleExpense: (state, action) => {
            state.singleExpense = action.payload; // ✅ FIXED TYPO
        },

        /* ================= LOGOUT CLEANUP ================= */
        clearExpenseState: () => {
            return initialState; 
            // ✅ clears Redux + redux-persist data
        }
    }
});

export const {
    setCategory,
    setMarkAsDone,
    setExpense,
    setSingleExpense,
    clearExpenseState
} = expenseSlice.actions;

export default expenseSlice.reducer;
