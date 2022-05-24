import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  jwtToken: "",
  id: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.login = action.payload.login;
      state.jwtToken = action.payload.jwtToken;
      state.id = action.payload.id;

      state.user = action.payload.user;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
