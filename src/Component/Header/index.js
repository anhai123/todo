import "./header.css";

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
export default Header;
