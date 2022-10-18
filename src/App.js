import "./App.css";
import { Fragment, useEffect, useRef, useState } from "react";
import Header from "./Component/Header";
import Toggle from "./Component/Toggle";
import TodoList from "./Component/TodoList";
import Footer from "./Component/Footer";
//bug: input editing chuaw tu lose focus khi ma click chuot ra cho khac. Tim cacsh di. useref chua dc
//cash fix: dung document de query DOM element xong roi dung useeffect de focus vao no. Nhuwng dung useRef trong element de set cho current thi chua dc do
// van bi element la element cuoi cung

function App() {
  const [todoList, setTooList] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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
