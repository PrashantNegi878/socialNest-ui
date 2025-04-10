import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Ensure initial state is set to null
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Update user state with payload
    },
    clearUser(state) {
      state.user = null; // Clear user state
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
