const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function renderEmptyState() {
  if (todoList.children.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No todos yet. Add one above.";
    todoList.appendChild(empty);
  }
}

function removeEmptyState() {
  const existing = todoList.querySelector(".empty-state");
  if (existing) {
    existing.remove();
  }
}

function createTodoItem(text) {
  const item = document.createElement("li");
  item.className = "todo-item";

  const label = document.createElement("span");
  label.className = "todo-text";
  label.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    item.remove();
    renderEmptyState();
  });

  item.append(label, deleteButton);
  return item;
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = todoInput.value.trim();
  if (!value) {
    todoInput.focus();
    return;
  }

  removeEmptyState();
  todoList.appendChild(createTodoItem(value));
  todoInput.value = "";
  todoInput.focus();
});

renderEmptyState();
