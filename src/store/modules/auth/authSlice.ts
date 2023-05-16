import { createSlice } from "@reduxjs/toolkit";
import { getAuthDetails } from "./authActions";

const initialState = {
  authDetails: {},
  idToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthDetails.fulfilled, (state, action) => {
      // state.authDetails = action.payload;
    });
  },
});

export const { actions, reducer } = authSlice;
export default reducer;
