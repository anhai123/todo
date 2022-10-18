import "./toggle.css";
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
export default Toggle;
