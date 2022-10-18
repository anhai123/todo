import "./Todolist.css";
import TodoRendering from "./TodoRendering";
function TodoList(props) {
  return (
    <ul class="todo-list">
      {props.todoList.map((todo) => {
        if (props.isAll) {
          if (todo.isComplete) {
            return (
              <TodoRendering
                todo={todo}
                todoList={props.todoList}
                setTooList={props.setTooList}
                complete={true}
              />
            );
          } else {
            return (
              <TodoRendering
                todo={todo}
                todoList={props.todoList}
                setTooList={props.setTooList}
                complete={false}
              />
            );
          }
        } else if (props.isActive && !todo.isComplete) {
          return (
            <TodoRendering
              todo={todo}
              todoList={props.todoList}
              setTooList={props.setTooList}
              complete={false}
            />
          );
        } else if (props.isComplete && todo.isComplete) {
          return (
            <TodoRendering
              todo={todo}
              todoList={props.todoList}
              setTooList={props.setTooList}
              complete={true}
            />
          );
        }
      })}
    </ul>
  );
}

export default TodoList;
