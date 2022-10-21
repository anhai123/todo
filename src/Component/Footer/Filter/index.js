import "./Filter.css";
import { memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsAll,
  setIsActive,
  setIsComplete,
} from "../../../feature/todoSlice";
function Filter(props) {
  const { isAll, isActive, isComplete } = useSelector((state) => state.todo);
  const dispatcher = useDispatch();
  return (
    <ul class="filters">
      <li
        onClick={() => {
          dispatcher(setIsAll(true));
          dispatcher(setIsActive(false));
          dispatcher(setIsComplete(false));
        }}
      >
        <a href="#" className={isAll ? "selected" : ""}>
          All
        </a>
      </li>
      <span> </span>
      <li
        onClick={() => {
          dispatcher(setIsAll(false));
          dispatcher(setIsActive(true));
          dispatcher(setIsComplete(false));
        }}
      >
        <a href="#" className={isActive ? "selected" : ""}>
          Active
        </a>
      </li>
      <span> </span>
      <li
        onClick={() => {
          dispatcher(setIsAll(false));
          dispatcher(setIsActive(false));
          dispatcher(setIsComplete(true));
        }}
      >
        <a href="#" className={isComplete ? "selected" : ""}>
          Completed
        </a>
      </li>
    </ul>
  );
}
export default memo(Filter);
