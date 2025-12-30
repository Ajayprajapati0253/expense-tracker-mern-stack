import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:"expense",
    initialState:{
        category:"",
        markAsDone:"",
        expenses:[],
        singleExpense:null,
    },
    reducers:{
        // actions
        setCategory:(state,action) => {
            state.category = action.payload;
        },
        setMarkAsDone:(state,action) => {
            state.markAsDone = action.payload;
        },
        setExpense:(state,action)=> {
            state.expenses = action.payload;
        },
        setSingleExpense:(state,action) => {
            state.setSingleExpense = action.payload;
        }
    }
})

export const {
    setCategory,
    setMarkAsDone,
    setExpense,
    setSingleExpense
} = expenseSlice.actions;

export default expenseSlice.reducer;