import { configureStore } from "@reduxjs/toolkit";
import accessTokenSlice from "./redux/accessTokenSlice";
// import accountReducer from "./account-reducer";
import userSlice from "./redux/userSlice";

export default configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    user: userSlice
  }
  // devTools: true
});