import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    didTryAutoLogin: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setDidTryAutoLogin(state, action) {
      state.didTryAutoLogin = true;
    },
    clearUser(state, action) {
      state.user = null;
      state.didTryAutoLogin = false;
    },
  },
});
export const { setUser, setDidTryAutoLogin, clearUser } = userSlice.actions;
export default userSlice.reducer;
