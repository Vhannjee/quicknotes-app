// ---------- 1. Select the elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");

const STORAGE_KEY = "quicknotes";
const MAX_LENGTH = 200;
const CATEGORY_LABELS = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

// ---------- 2. Data ----------
let notes = loadNotes();
let searchTerm = "";

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return []; // corrupted or missing data: start empty
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

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
  label.textContent = CATEGORY_LABELS[note.category] || note.category;

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  const del = document.createElement("button");
  del.type = "button";
  del.classList.add("delete-btn");
  del.textContent = "Delete";
  del.addEventListener("click", () => deleteNote(note.id));

  footer.append(label, date, del);
  li.append(text, footer);
  return li;
}

function countMessage() {
  if (notes.length === 0) return "You have no notes yet.";
  if (notes.length === 1) return "You have 1 note.";
  return `You have ${notes.length} notes.`;
}

function render() {
  list.replaceChildren();

  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  visibleNotes.forEach((note) => list.appendChild(createNoteCard(note)));

  if (searchTerm !== "" && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    list.appendChild(empty);
  }

  count.textContent = countMessage();
}

// ---------- 4. Validation ----------
function validate(text) {
  if (text === "") return "Please type a note first.";
  if (text.length > MAX_LENGTH) return "Notes must be 200 characters or fewer.";
  return "";
}

// ---------- 5. Adding and deleting ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ---------- 6. Events ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  const error = validate(text);

  errorMessage.textContent = error;
  if (error !== "") return;

  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

input.addEventListener("input", () => {
  errorMessage.textContent = "";
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  render();
});

render();
