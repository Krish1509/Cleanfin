/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the auth slice
const initialState = {
  user: null, // Store user details (e.g., name, email, etc.)
  error: null, // Store error information
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state: any, action: any) => {
      // Handle login, store user
      state.user = action.payload;
    },
    logout: (state: any) => {
      // Handle logout, clear user and token
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions
export const { setUserDetails, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
