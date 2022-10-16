import "./App.css";
import { useEffect, useRef, useState } from "react";

//bug: input editing chuaw tu lose focus khi ma click chuot ra cho khac. Tim cacsh di. useref chua dc
//cash fix: dung document de query DOM element xong roi dung useeffect de focus vao no. Nhuwng dung useRef trong element de set cho current thi chua dc do
// van bi element la element cuoi cung
function App() {
  const [todoList, setTooList] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [itemLeft, setItemLeft] = useState(0);
  var inputEl = useRef(null);
  useEffect(() => {
    setItemLeft(todoList.filter((todo) => todo.isComplete === false).length);
  }, [todoList]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      var id = "id" + Math.random().toString(16).slice(2);
      setTooList([
        ...todoList,
        {
          id: id,
          value: event.target.value,
          isComplete: false,
          isEditing: false,
        },
      ]);
    }
  };
  const handleClickCheckbox = (ev, todo) => {
    const index = todoList.findIndex((todo1) => {
      return todo1.id === todo.id;
    });

    if (ev.target.checked) {
      todoList[index].isComplete = true;
      setTooList([...todoList]);
    } else {
      todoList[index].isComplete = false;
      setTooList([...todoList]);
    }
  };
  const handleClickClearComplete = () => {
    const todl = todoList.filter((todo) => {
      return todo.isComplete !== true;
    });
    setTooList(todl);
  };

  const handelDoubleClickInput = (todo) => {
    // console.log(document.getElementById(todo.id).lastChild);
    inputEl.current = document.getElementById(todo.id).lastChild;
    const index = todoList.findIndex((todo1) => {
      return todo1.id === todo.id;
    });
    for (var i = 0; i < todoList.length; i++) {
      if (i === index) {
        todoList[i].isEditing = true;
      } else {
        todoList[i].isEditing = false;
      }
    }
    // console.log(inputEl.current);
    // console.log(document.activeElement);
    setTooList([...todoList]);
  };

  const handelBurInput = (e, id) => {
    const index = todoList.findIndex((todo1) => {
      return todo1.id === id;
    });
    todoList[index].isEditing = false;
    setTooList([...todoList]);
  };

  const handelFocusInput = (e) => {
    console.log(e);
  };

  const handelLabelToggle = () => {
    if (itemLeft === todoList.length) {
      for (var i = 0; i < todoList.length; i++) {
        todoList[i].isComplete = true;
      }
      setTooList([...todoList]);
    } else if (itemLeft < todoList.length && itemLeft !== 0) {
      for (var i = 0; i < todoList.length; i++) {
        todoList[i].isComplete = true;
      }
      setTooList([...todoList]);
    } else {
      for (var i = 0; i < todoList.length; i++) {
        todoList[i].isComplete = false;
      }
      setTooList([...todoList]);
    }
  };

  const handelEditChange = (event, id) => {
    const index = todoList.findIndex((todo1) => {
      return todo1.id === id;
    });
    todoList[index].value = event.target.value;
    setTooList([...todoList]);
  };

  useEffect(() => {
    // console.log(inputEl.current);
    if (inputEl.current !== null) {
      inputEl.current.focus();
    }
    // console.log(document.activeElement);
  }, [todoList]);
  return (
    <section class="todoapp">
      <div>
        <header class="header">
          <h1>todos</h1>
          <input
            onKeyDown={handleKeyDown}
            class="new-todo"
            placeholder="What needs to be done?"
          ></input>
        </header>
        <section class="main">
          <input id="toggle-all" class="toggle-all" type="checkbox" />
          <label onClick={handelLabelToggle} for="toggle-all"></label>
          <ul class="todo-list">
            {todoList.map((todo) => {
              if (isAll) {
                if (todo.isComplete) {
                  return (
                    <li
                      id={todo.id}
                      className={
                        todo.isEditing ? "completed editing" : "completed"
                      }
                      onDoubleClick={(event) => {
                        handelDoubleClickInput(todo);
                      }}
                    >
                      <div class="view">
                        <input
                          onClick={(ev) => {
                            return handleClickCheckbox(ev, todo);
                          }}
                          class="toggle"
                          type="checkbox"
                          checked
                        />
                        <label>{todo.value}</label>
                        <button class="destroy"></button>
                      </div>
                      <input
                        class="edit"
                        onChange={(e) => handelEditChange(e, todo.id)}
                        value={todo.value}
                        onFocus={(e) => handelFocusInput(e, todo.id)}
                        onBlur={(e) => handelBurInput(e, todo.id)}
                      />
                    </li>
                  );
                } else {
                  return (
                    <li
                      id={todo.id}
                      className={todo.isEditing ? "editing" : ""}
                      onDoubleClick={(event) => {
                        handelDoubleClickInput(todo);
                      }}
                    >
                      <div class="view">
                        <input
                          onClick={(ev) => {
                            return handleClickCheckbox(ev, todo);
                          }}
                          class="toggle"
                          type="checkbox"
                        />
                        <label>{todo.value}</label>
                        <button class="destroy"></button>
                      </div>
                      <input
                        class="edit"
                        onChange={(e) => handelEditChange(e, todo.id)}
                        value={todo.value}
                        onFocus={(e) => handelFocusInput(e, todo.id)}
                        onBlur={(e) => handelBurInput(e, todo.id)}
                      />
                    </li>
                  );
                }
              } else if (isActive && !todo.isComplete) {
                return (
                  <li
                    id={todo.id}
                    className={todo.isEditing ? "editing" : ""}
                    onDoubleClick={(event) => {
                      handelDoubleClickInput(todo);
                    }}
                  >
                    <div class="view">
                      <input
                        onClick={(ev) => {
                          return handleClickCheckbox(ev, todo);
                        }}
                        class="toggle"
                        type="checkbox"
                      />
                      <label>{todo.value}</label>
                      <button class="destroy"></button>
                    </div>
                    <input
                      class="edit"
                      onChange={(e) => handelEditChange(e, todo.id)}
                      value={todo.value}
                      onFocus={(e) => handelFocusInput(e, todo.id)}
                      onBlur={(e) => handelBurInput(e, todo.id)}
                    />
                  </li>
                );
              } else if (isComplete && todo.isComplete) {
                return (
                  <li
                    id={todo.id}
                    className={
                      todo.isEditing ? "completed editing" : "completed"
                    }
                    onDoubleClick={(event) => {
                      handelDoubleClickInput(todo);
                    }}
                  >
                    <div class="view">
                      <input
                        onClick={(ev) => {
                          return handleClickCheckbox(ev, todo);
                        }}
                        class="toggle"
                        type="checkbox"
                        checked="true"
                      />
                      <label>{todo.value}</label>
                      <button class="destroy"></button>
                    </div>
                    <input
                      class="edit"
                      onChange={(e) => handelEditChange(e, todo.id)}
                      value={todo.value}
                      onFocus={(e) => handelFocusInput(e, todo.id)}
                      onBlur={(e) => handelBurInput(e, todo.id)}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </section>

        <footer class="footer">
          <span class="todo-count">
            <strong>{itemLeft}</strong>
            <span> </span>
            <span>items</span>
            <span> left</span>
          </span>
          <ul class="filters">
            <li
              onClick={() => {
                setIsAll(true);
                setIsActive(false);
                setIsComplete(false);
              }}
            >
              <a href="#" className={isAll ? "selected" : ""}>
                All
              </a>
            </li>
            <span> </span>
            <li
              onClick={() => {
                setIsAll(false);
                setIsActive(true);
                setIsComplete(false);
              }}
            >
              <a href="#" className={isActive ? "selected" : ""}>
                Active
              </a>
            </li>
            <span> </span>
            <li
              onClick={() => {
                setIsAll(false);
                setIsActive(false);
                setIsComplete(true);
              }}
            >
              <a href="#" className={isComplete ? "selected" : ""}>
                Completed
              </a>
            </li>
          </ul>
          <button onClick={handleClickClearComplete} class="clear-completed">
            Clear completed
          </button>
        </footer>
      </div>
    </section>
  );
}

export default App;
