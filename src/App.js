import "./App.css";
import { Fragment, useEffect, useRef, useState } from "react";
import Header from "./Component/Header";
import Toggle from "./Component/Toggle";
import TodoList from "./Component/TodoList";
import Footer from "./Component/Footer";
//bug: input editing chuaw tu lose focus khi ma click chuot ra cho khac. Tim cacsh di. useref chua dc
//cash fix: dung document de query DOM element xong roi dung useeffect de focus vao no. Nhuwng dung useRef trong element de set cho current thi chua dc do
// van bi element la element cuoi cung

import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "./feature/todoSlice";

function App() {
  const dispatcher = useDispatch();
  const { todoList1 } = useSelector((state) => state.todo);
  const [todoList, setTooList] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <section class="todoapp">
      <div>
        <Header />

        <section class="main">
          <Toggle />
          <TodoList />
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
