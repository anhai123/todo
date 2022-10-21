import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todoList1: [],
  itemLeft: 0,
  isAll: true,
  isActive: false,
  isComplete: false,
};
const messageSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList1 = [...action.payload];
      state.itemLeft = state.todoList1.filter(
        (todo) => todo.isComplete === false
      ).length;
    },
    addTodoList: (state, action) => {
      state.todoList1 = [...state.todoList1, action.payload];
      state.itemLeft = state.todoList1.filter(
        (todo) => todo.isComplete === false
      ).length;
    },
    setIsAll: (state, action) => {
      state.isAll = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setIsComplete: (state, action) => {
      state.isComplete = action.payload;
    },
  },
});
const { reducer, actions } = messageSlice;
export const {
  setTodoList,
  addTodoList,
  setIsAll,
  setIsActive,
  setIsComplete,
} = actions;
export default reducer;

//import { useDispatch, useSelector } from 'react-redux';
