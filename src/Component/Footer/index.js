import "./Footer.css";
import Filter from "./Filter.js";
import { useCallback } from "react";

// todoList={todoList}
// setTooList={setTooList}
// isAll={isAll}
// isActive={isActive}
// isComplete={isComplete}
// setIsAll={setIsAll}
// setIsActive={setIsActive}
// setIsComplete={setIsComplete}

import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "../../feature/todoSlice";
function Footer(props) {
  const { todoList1 } = useSelector((state) => state.todo);
  const dispatcher = useDispatch();
  const handleClickClearComplete = useCallback(() => {
    const todl = todoList1((todo) => {
      return todo.isComplete !== true;
    });
    dispatcher(setTodoList(todl));
  });
  return (
    <footer class="footer">
      <span class="todo-count">
        <strong>
          {todoList1.filter((todo) => todo.isComplete === false).length}
        </strong>
        <span> </span>
        <span>items</span>
        <span> left</span>
      </span>
      <Filter
        isAll={props.isAll}
        isActive={props.isActive}
        isComplete={props.isComplete}
        setIsAll={props.setIsAll}
        setIsActive={props.setIsActive}
        setIsComplete={props.setIsComplete}
        todoList={props.todoList}
      />
      <button onClick={handleClickClearComplete} class="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
export default Footer;
