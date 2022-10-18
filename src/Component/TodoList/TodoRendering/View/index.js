import "./View.css";
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
      {props.checked === false ? (
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

export default View;
