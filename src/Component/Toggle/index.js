import "./toggle.css";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "../../feature/todoSlice";
function Toggle(props) {
  const { todoList1, itemLeft } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const handelLabelToggle = useCallback(() => {
    // if (props.itemLeft === props.todoList.length) {
    //   for (var i = 0; i < props.todoList.length; i++) {
    //     props.todoList[i].isComplete = true;
    //   }
    //   props.setTooList([...props.todoList]);
    // } else if (props.itemLeft < props.todoList.length && props.itemLeft !== 0) {
    //   for (var i = 0; i < props.todoList.length; i++) {
    //     props.todoList[i].isComplete = true;
    //   }
    //   props.setTooList([...props.todoList]);
    // } else {
    //   for (var i = 0; i < props.todoList.length; i++) {
    //     props.todoList[i].isComplete = false;
    //   }
    //   props.setTooList([...props.todoList]);
    // }

    const td2 = [...todoList1];
    console.log(td2);
    if (itemLeft === td2.length) {
      for (var i = 0; i < todoList1.length; i++) {
        td2[i] = { ...td2[i], isComplete: true };
      }
      dispatch(setTodoList([...td2]));
    } else if (itemLeft < td2.length && itemLeft !== 0) {
      for (var i = 0; i < td2.length; i++) {
        td2[i] = { ...td2[i], isComplete: true };
      }
      dispatch(setTodoList([...td2]));
    } else {
      for (var i = 0; i < td2.length; i++) {
        td2[i] = { ...td2[i], isComplete: false };
      }
      dispatch(setTodoList([...td2]));
    }
  });
  return (
    <>
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label onClick={handelLabelToggle} for="toggle-all"></label>
    </>
  );
}
export default Toggle;
