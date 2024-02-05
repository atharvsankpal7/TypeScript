import {v4} from "../_snowpack/pkg/uuid.js";
const TODOAPP_DRIVER = () => {
  const list = document.querySelector("#list");
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-title");
  if (!list || !form || !input) {
    document.write("please review HTML");
    return;
  }
  const loadTodo = () => {
    const todos = localStorage.getItem("todoItems");
    if (todos === null)
      return [];
    return JSON.parse(todos);
  };
  const loadExistingTodos = (todoArray2) => {
    todoArray2.forEach((todo) => {
      updateUI(todo);
    });
  };
  let todoArray = loadTodo();
  const updateTodo = (todo) => {
    const index = todoArray.findIndex((e) => e.id === todo.id);
    if (index === -1) {
      todoArray.push(todo);
    } else {
      todoArray[index] = todo;
    }
    localStorage.setItem("todoItems", JSON.stringify(todoArray));
  };
  function updateUI(newTodo) {
    if (!input || !list) {
      document.write("Verify HTML");
      return;
    }
    const listElement = document.createElement("li");
    const listElementLabel = document.createElement("label");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = newTodo.completed;
    listElementLabel.append(newTodo.content, checkBox);
    listElement.append(listElementLabel);
    list.appendChild(listElement);
    listElementLabel.addEventListener("change", () => {
      newTodo.completed = checkBox.checked;
      updateTodo(newTodo);
    });
    input.value = "";
  }
  const addTodoItem = (newTodo) => {
    updateUI(newTodo);
    updateTodo(newTodo);
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("h");
    const newTodo = {
      id: v4(),
      content: input.value,
      dateCreated: new Date(),
      completed: false
    };
    addTodoItem(newTodo);
  });
  loadExistingTodos(todoArray);
};
TODOAPP_DRIVER();
export {};
