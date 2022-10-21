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
  return (
    <section class="todoapp">
      <div>
        <Header />

        <section class="main">
          <Toggle />
          <TodoList />
        </section>

        <Footer />
      </div>
    </section>
  );
}

export default App;
