# Interactive To-Do List with LocalStorage

A simple task manager built with HTML, CSS and vanilla JavaScript.

## Features
- Add tasks (Add button or Enter key); empty tasks are rejected
- Mark tasks complete / undo with a checkbox
- Delete tasks
- Filter: All, Active, Done
- Remaining-tasks counter
- Clear completed button
- Tasks persist after page reload

## How data is saved and loaded
- All tasks are kept in one array called `tasks`. Each task is `{ id, text, done }`.
- `save()` converts the array to text with `JSON.stringify` and stores it in `localStorage` under the key `tasks`. It runs after every add, toggle, delete and clear.
- `load()` reads the text back with `JSON.parse` inside a `try/catch`. If the data is missing or corrupted, it returns an empty array so the app never breaks. It runs once at start-up.
- `render()` rebuilds the list from the array every time something changes.
- Task text is displayed with `textContent`, never `innerHTML`, to prevent code injection.

## Run locally
Open the folder in VS Code and start it with the Live Server extension (or just open `index.html`).

## Files
- `index.html` – page structure
- `style.css` – styling
- `app.js` – state, rendering, events, storage
