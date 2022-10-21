import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todoSlice";

const reducer = {
  todo: todoReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
