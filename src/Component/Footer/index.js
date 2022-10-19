import "./Footer.css";
import Filter from "./Filter";
import { useCallback } from "react";
function Footer(props) {
  const handleClickClearComplete = useCallback(() => {
    const todl = props.todoList.filter((todo) => {
      return todo.isComplete !== true;
    });
    props.setTooList(todl);
  });
  return (
    <footer class="footer">
      <span class="todo-count">
        <strong>
          {props.todoList.filter((todo) => todo.isComplete === false).length}
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
