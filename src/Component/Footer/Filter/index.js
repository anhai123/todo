import "./Filter.css";
import { memo } from "react";
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
export default memo(Filter);
