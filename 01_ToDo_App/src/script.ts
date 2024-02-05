import { v4 } from "uuid";

const TODOAPP_DRIVER = (): void => {
    const list = document.querySelector<HTMLUListElement>("#list");
    const form = document.querySelector<HTMLFormElement>("#new-task-form");
    const input = document.querySelector<HTMLInputElement>("#new-task-title");

    if (!list || !form || !input) {
        document.write("please review HTML");
        return;
    }

    type Todo = {
        id: string;
        completed: boolean;
        dateCreated: Date;
        content: string;
    };
    const loadTodo = () => {
        const todos = localStorage.getItem("todoItems");
        if (todos === null) return [];
        return JSON.parse(todos);
    };

    const loadExistingTodos = (todoArray: Todo[]) => {
        todoArray.forEach((todo) => {
            updateUI(todo);
        });
    };

    let todoArray: Todo[] = loadTodo();

    const updateTodo = (todo: Todo): void => {
        const index = todoArray.findIndex((e) => e.id === todo.id);

        if (index === -1) {
            todoArray.push(todo);
        } else {
            todoArray[index] = todo;
        }

        localStorage.setItem("todoItems", JSON.stringify(todoArray));
    };

    function updateUI(newTodo: Todo) {
        if (!input || !list) {
            document.write("Verify HTML");
            return;
        }
        const listElement = document.createElement("li");
        const listElementLabel = document.createElement("label");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = newTodo.completed
        listElementLabel.append(newTodo.content, checkBox);
        listElement.append(listElementLabel);

        list.appendChild(listElement);
        listElementLabel.addEventListener("change", () => {
            newTodo.completed = checkBox.checked;
            updateTodo(newTodo);
        });
        input.value = "";
    }
    const addTodoItem = (newTodo: Todo): void => {
        updateUI(newTodo);
        updateTodo(newTodo);
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("h");
        const newTodo: Todo = {
            id: v4(),
            content: input.value,
            dateCreated: new Date(),
            completed: false,
        };
        addTodoItem(newTodo);
    });

    loadExistingTodos(todoArray);
};
TODOAPP_DRIVER();
export {};
