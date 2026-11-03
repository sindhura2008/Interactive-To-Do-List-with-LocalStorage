// State: all tasks live in this one array.
// Each task looks like { id: 1, text: "Buy milk", done: false }
let tasks = load();
let filter = "all";

const form = document.getElementById("form");
const input = document.getElementById("text");
const list = document.getElementById("list");
const count = document.getElementById("count");
const empty = document.getElementById("empty");
const clearBtn = document.getElementById("clear");
const filters = document.getElementById("filters");

// ---------- Storage ----------
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load() {
  try {
    const data = JSON.parse(localStorage.getItem("tasks"));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return []; // corrupted data never breaks the page
  }
}

// ---------- Render ----------
function visibleTasks() {
  if (filter === "active") return tasks.filter((t) => !t.done);
  if (filter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

function render() {
  list.innerHTML = "";

  visibleTasks().forEach((t) => {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    if (t.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.done;
    checkbox.dataset.action = "toggle";
    checkbox.setAttribute("aria-label", "Mark complete");

    const label = document.createElement("span");
    label.textContent = t.text; // textContent keeps user text safe

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete";
    del.dataset.action = "delete";

    li.append(checkbox, label, del);
    list.append(li);
  });

  const left = tasks.filter((t) => !t.done).length;
  count.textContent = left + (left === 1 ? " task left" : " tasks left");
  empty.hidden = visibleTasks().length > 0;

  filters.querySelectorAll("button").forEach((b) => {
    b.classList.toggle("active", b.dataset.filter === filter);
  });
}

// ---------- Events ----------
// Add a task (click on Add or Enter key both submit the form)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return; // ignore empty tasks
  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = "";
  save();
  render();
});

// Complete / delete using event delegation
list.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;
  const id = Number(e.target.closest("li").dataset.id);

  if (action === "delete") {
    tasks = tasks.filter((t) => t.id !== id);
  } else if (action === "toggle") {
    tasks.forEach((t) => {
      if (t.id === id) t.done = !t.done;
    });
  }
  save();
  render();
});

// Filters
filters.addEventListener("click", (e) => {
  const chosen = e.target.dataset.filter;
  if (!chosen) return;
  filter = chosen;
  render();
});

// Clear completed
clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  save();
  render();
});

render();
