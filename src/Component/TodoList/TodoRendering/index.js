import "./TodoRendering.css";
import View from "./View.js";
import { useCallback, useEffect, useRef, useState } from "react";

function TodoRendering(props) {
  var inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current !== null) {
      inputEl.current.focus();
    }
  }, [props.todoList]);

  const handelDoubleClickInput = useCallback((todo) => {
    inputEl.current = document.getElementById(todo.id).lastChild;
    const index = props.todoList.findIndex((td) => {
      return td.id === todo.id;
    });
    for (var i = 0; i < props.todoList.length; i++) {
      if (i === index) {
        props.todoList[i].isEditing = true;
      } else {
        props.todoList[i].isEditing = false;
      }
    }
    props.setTooList([...props.todoList]);
  });

  const handelBurInput = useCallback((e, id) => {
    const index = props.todoList.findIndex((td) => {
      return td.id === id;
    });
    props.todoList[index].isEditing = false;
    props.setTooList([...props.todoList]);
  });

  const handelEditChange = useCallback((event, id) => {
    const index = props.todoList.findIndex((td) => {
      return td.id === id;
    });
    props.todoList[index].value = event.target.value;
    props.setTooList([...props.todoList]);
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
      <View
        todo={props.todo}
        todoList={props.todoList}
        setTooList={props.setTooList}
        checked={props.todo.isComplete}
      />
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
