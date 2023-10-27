import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// const userReducer = require("../features/userslice")
import { loggedReducer, userReducer } from "../features/userslice";
import { createLogger } from "redux-logger";
const logger = createLogger();
import adminReducers from "../features/AdminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    logged: loggedReducer,
    admin: adminReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
