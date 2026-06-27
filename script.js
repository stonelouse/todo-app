const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");
const THEME_STORAGE_KEY = "todo-app-theme";

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.textContent = isDark ? "Switch to light" : "Switch to dark";
}

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

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});
