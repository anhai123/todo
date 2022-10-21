import "./TodoRendering.css";
import View from "./View.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "../../../feature/todoSlice";
function TodoRendering(props) {
  const { todoList1 } = useSelector((state) => state.todo);
  const dispatcher = useDispatch();
  var inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current !== null) {
      inputEl.current.focus();
    }
  }, [todoList1]);

  const handelDoubleClickInput = useCallback((todo) => {
    inputEl.current = document.getElementById(todo.id).lastChild;
    const index = todoList1.findIndex((td) => {
      return td.id === todo.id;
    });

    const td2 = [...todoList1];
    for (var i = 0; i < todoList1.length; i++) {
      if (i === index) {
        td2[i] = { ...td2[i], isEditing: true };
      } else {
        td2[i] = { ...td2[i], isEditing: false };
      }
    }
    dispatcher(setTodoList([...td2]));
  });

  const handelBurInput = useCallback((e, id) => {
    const td2 = [...todoList1];
    const index = todoList1.findIndex((td) => {
      return td.id === id;
    });
    td2[index] = { ...td2[index], isEditing: false };
    dispatcher(setTodoList([...td2]));
  });

  const handelEditChange = useCallback((event, id) => {
    const td2 = [...todoList1];
    const index = todoList1.findIndex((td) => {
      return td.id === id;
    });
    td2[index] = { ...td2[index], value: event.target.value };
    dispatcher(setTodoList([...td2]));
  });

  let classNameLi = useCallback(() => {
    if (props.complete) {
      if (props.todo.isEditing) {
        return "completed editing";
      } else return "completed";
    } else {
      if (props.todo.isEditing) {
        return "editing";
      } else return "";
    }
  });

  return (
    <li
      id={props.todo.id}
      className={classNameLi()}
      onDoubleClick={(event) => {
        handelDoubleClickInput(props.todo);
      }}
    >
      <View todo={props.todo} checked={props.todo.isComplete} />
      <input
        class="edit"
        onChange={(e) => handelEditChange(e, props.todo.id)}
        value={props.todo.value}
        onBlur={(e) => handelBurInput(e, props.todo.id)}
      />
    </li>
  );
}

export default TodoRendering;
