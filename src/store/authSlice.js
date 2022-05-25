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
    logOut: (state) => {
      state.login = "";
      state.jwtToken = "";
      state.id = null;

      state.user = {
        firstName: "",
        lastName: "",
        email: "",
        position: "",
      };
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
