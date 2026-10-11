// ---------- 1. Select the elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

const CATEGORY_LABELS = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

// ---------- 2. Data ----------
let notes = [];

// ---------- 3. Drawing ----------
function createNoteCard(note) {
  const li = document.createElement("li");
  li.classList.add("note", `category-${note.category}`);

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const footer = document.createElement("div");
  footer.classList.add("note-footer");

  const label = document.createElement("span");
  label.classList.add("category-label");
  label.textContent = CATEGORY_LABELS[note.category];

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  const del = document.createElement("button");
  del.type = "button";
  del.classList.add("delete-btn");
  del.textContent = "Delete";

  footer.append(label, date, del);
  li.append(text, footer);
  return li;
}

function render() {
  list.replaceChildren();
  notes.forEach((note) => list.appendChild(createNoteCard(note)));
}

// ---------- 4. Adding ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

// ---------- 5. Events ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addNote(input.value.trim(), categorySelect.value);
  input.value = "";
  input.focus();
});

render();
