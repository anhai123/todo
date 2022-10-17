import "./App.css";
import { Fragment, useEffect, useRef, useState } from "react";

//bug: input editing chuaw tu lose focus khi ma click chuot ra cho khac. Tim cacsh di. useref chua dc
//cash fix: dung document de query DOM element xong roi dung useeffect de focus vao no. Nhuwng dung useRef trong element de set cho current thi chua dc do
// van bi element la element cuoi cung

function Header(props) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return;
      }
      var id = "id" + Math.random().toString(16).slice(2);
      props.setTooList([
        ...props.todoList,
        {
          id: id,
          value: event.target.value,
          isComplete: false,
          isEditing: false,
        },
      ]);
      event.target.value = "";
    }
  };

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

function Toggle(props) {
  const handelLabelToggle = () => {
    if (props.itemLeft === props.todoList.length) {
      for (var i = 0; i < props.todoList.length; i++) {
        props.todoList[i].isComplete = true;
      }
      props.setTooList([...props.todoList]);
    } else if (props.itemLeft < props.todoList.length && props.itemLeft !== 0) {
      for (var i = 0; i < props.todoList.length; i++) {
        props.todoList[i].isComplete = true;
      }
      props.setTooList([...props.todoList]);
    } else {
      for (var i = 0; i < props.todoList.length; i++) {
        props.todoList[i].isComplete = false;
      }
      props.setTooList([...props.todoList]);
    }
  };
  return (
    <>
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label onClick={handelLabelToggle} for="toggle-all"></label>
    </>
  );
}

//prop: settodo va todoList
function View(props) {
  const handleClickCheckbox = (ev, todo) => {
    const index = props.todoList.findIndex((td) => {
      return td.id === todo.id;
    });

    if (ev.target.checked) {
      props.todoList[index].isComplete = true;
      props.setTooList([...props.todoList]);
    } else {
      props.todoList[index].isComplete = false;
      props.setTooList([...props.todoList]);
    }
  };
  const handleDestroyButton = (id) => {
    const list = props.todoList.filter((todo) => {
      return todo.id !== id;
    });
    props.setTooList([...list]);
  };
  return (
    <div class="view">
      {props.checked == false ? (
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

function TodoRendering(props) {
  var inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current !== null) {
      inputEl.current.focus();
    }
  }, [props.todoList]);

  const handelDoubleClickInput = (todo) => {
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
  };
  const handelBurInput = (e, id) => {
    const index = props.todoList.findIndex((td) => {
      return td.id === id;
    });
    props.todoList[index].isEditing = false;
    props.setTooList([...props.todoList]);
  };
  const handelEditChange = (event, id) => {
    const index = props.todoList.findIndex((td) => {
      return td.id === id;
    });
    props.todoList[index].value = event.target.value;
    props.setTooList([...props.todoList]);
  };
  let classNameLi = () => {
    if (props.complete) {
      if (props.todo.isEditing) {
        return "completed editing";
      } else return "completed";
    } else {
      if (props.todo.isEditing) {
        return "editing";
      } else return "";
    }
  };
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

//prop: todoList setIsAll setIsActive setIsComplete
function Footer(props) {
  const handleClickClearComplete = () => {
    const todl = props.todoList.filter((todo) => {
      return todo.isComplete !== true;
    });
    props.setTooList(todl);
  };
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

function Filter(props) {
  return (
    <ul class="filters">
      <li
        onClick={() => {
          props.setIsAll(true);
          props.setIsActive(false);
          props.setIsComplete(false);
        }}
      >
        <a href="#" className={props.isAll ? "selected" : ""}>
          All
        </a>
      </li>
      <span> </span>
      <li
        onClick={() => {
          props.setIsAll(false);
          props.setIsActive(true);
          props.setIsComplete(false);
        }}
      >
        <a href="#" className={props.isActive ? "selected" : ""}>
          Active
        </a>
      </li>
      <span> </span>
      <li
        onClick={() => {
          props.setIsAll(false);
          props.setIsActive(false);
          props.setIsComplete(true);
        }}
      >
        <a href="#" className={props.isComplete ? "selected" : ""}>
          Completed
        </a>
      </li>
    </ul>
  );
}

function App() {
  const [todoList, setTooList] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  var inputEl = useRef(null);

  useEffect(() => {
    if (inputEl.current !== null) {
      inputEl.current.focus();
    }
  }, [todoList]);
  return (
    <section class="todoapp">
      <div>
        <Header
          itemLeft={todoList.filter((todo) => todo.isComplete === false).length}
          todoList={todoList}
          setTooList={setTooList}
        />

        <section class="main">
          <Toggle
            itemLeft={
              todoList.filter((todo) => todo.isComplete === false).length
            }
            todoList={todoList}
            setTooList={setTooList}
          />
          <TodoList
            todoList={todoList}
            setTooList={setTooList}
            isAll={isAll}
            isActive={isActive}
            isComplete={isComplete}
          />
        </section>

        <Footer
          todoList={todoList}
          setTooList={setTooList}
          isAll={isAll}
          isActive={isActive}
          isComplete={isComplete}
          setIsAll={setIsAll}
          setIsActive={setIsActive}
          setIsComplete={setIsComplete}
        />
      </div>
    </section>
  );
}

export default App;
