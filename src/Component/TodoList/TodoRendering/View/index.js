import "./View.css";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "../../../../feature/todoSlice";
function View(props) {
  const { todoList1 } = useSelector((state) => state.todo);
  const dispatcher = useDispatch();
  const handleClickCheckbox = useCallback((ev, todo) => {
    const index = todoList1.findIndex((td) => {
      return td.id === todo.id;
    });

    if (ev.target.checked) {
      const td2 = [...todoList1];
      td2[index] = { ...td2[index], isComplete: true };
      dispatcher(setTodoList([...td2]));
    } else {
      const td2 = [...todoList1];
      td2[index] = { ...td2[index], isComplete: false };
      dispatcher(setTodoList([...td2]));
    }
  });
  const handleDestroyButton = useCallback((id) => {
    const list = todoList1.filter((todo) => {
      return todo.id !== id;
    });
    dispatcher(setTodoList([...list]));
  });
  return (
    <div class="view">
      {props.checked === false ? (
        <input
          onClick={(ev) => {
            return handleClickCheckbox(ev, props.todo);
          }}
          class="toggle"
          type="checkbox"
        />
      ) : (
        <input
          onClick={(ev) => {
            return handleClickCheckbox(ev, props.todo);
          }}
          class="toggle"
          type="checkbox"
          checked
        />
      )}

      <label>{props.todo.value}</label>
      <button
        onClick={() => handleDestroyButton(props.todo.id)}
        class="destroy"
      ></button>
    </div>
  );
}

export default View;
