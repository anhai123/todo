import "./Todolist.css";
import TodoRendering from "./TodoRendering";

// todoList={todoList}
// setTooList={setTooList}
// isAll={isAll}
// isActive={isActive}
// isComplete={isComplete}
import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "../../feature/todoSlice";

function TodoList(props) {
  const { isAll, isActive, isComplete, todoList1 } = useSelector(
    (state) => state.todo
  );
  const dispatcher = useDispatch();
  return (
    <ul class="todo-list">
      {todoList1.map((todo) => {
        if (isAll) {
          if (todo.isComplete) {
            return <TodoRendering todo={todo} complete={true} />;
          } else {
            return <TodoRendering todo={todo} complete={false} />;
          }
        } else if (isActive && !todo.isComplete) {
          return <TodoRendering todo={todo} complete={false} />;
        } else if (isComplete && todo.isComplete) {
          return <TodoRendering todo={todo} complete={true} />;
        }
      })}
    </ul>
  );
}

export default TodoList;
