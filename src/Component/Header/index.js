import "./header.css";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoList } from "../../feature/todoSlice";
function Header(props) {
  const dispatcher = useDispatch();
  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return;
      }
      var id = "id" + Math.random().toString(16).slice(2);

      //exchange completed
      dispatcher(
        addTodoList({
          id: id,
          value: event.target.value,
          isComplete: false,
          isEditing: false,
        })
      );

      // props.setTooList([
      //   ...props.todoList,
      //   {
      //     id: id,
      //     value: event.target.value,
      //     isComplete: false,
      //     isEditing: false,
      //   },
      // ]);

      event.target.value = "";
    }
  });

  return (
    <header class="header">
      <h1>todos</h1>
      <input
        onKeyDown={handleKeyDown}
        class="new-todo"
        placeholder="What needs to be done?"
      ></input>
    </header>
  );
}
export default Header;
