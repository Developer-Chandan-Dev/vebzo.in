import { createSlice } from "@reduxjs/toolkit";

// Uniquey key for localStore to avoid conflicts
const LOCAL_STORAGE_KEY = "apana_grocery_store";

// Check for user data in localStorage
const userFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  : null;

const initialState = {
  user: userFromLocalStorage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      //   Save user to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      // Remove user from localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
