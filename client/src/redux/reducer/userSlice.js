import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    token: "",
    userInfo: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setToken, setUserInfo } = userSlice.actions;

export const tokenStatus = (payload) => {
  return function (dispatch) {
    dispatch(setToken(payload));
  };
};

export const userStatus = (payload) => {
  return function (dispatch) {
    dispatch(setUserInfo(payload));
  };
};
