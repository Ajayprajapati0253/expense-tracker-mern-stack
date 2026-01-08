import { createSlice } from "@reduxjs/toolkit";
import { clearExpenseState } from "./expenseSlice"; 
// ✅ IMPORT expense cleanup action

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {

        /* ================= LOADING ================= */
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        /* ================= LOGIN ================= */
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },

        /* ================= LOGOUT ================= */
        logout: (state) => {
            state.user = null;       // ✅ clear auth user
            state.loading = false;
        }
    }
});

export const {
    setLoading,
    setAuthUser,
    logout
} = authSlice.actions;

/* ================= EXTRA: LOGOUT SIDE EFFECT ================= */
// ✅ when logout happens → expense state must reset
export const logoutAndClearData = () => (dispatch) => {
    dispatch(logout());
    dispatch(clearExpenseState()); // 🔥 THIS FIXES OLD EXPENSE BUG
};

export default authSlice.reducer;
