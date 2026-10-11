# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file them under Personal, Work or Study, search through them and delete the ones you no longer need. Everything is saved in your browser, so your notes are still there when you come back.

## Features

- Add notes of 1 to 200 characters, with a friendly error message for empty or overlong notes
- Choose a category (Personal, Work or Study); each category has its own colour on the note card
- Every note shows its text, a category label, the date and time it was created, and a Delete button
- Live search that filters notes as you type, ignoring upper and lower case
- A message when a search finds nothing: "No notes match your search."
- A note counter with correct wording for zero, one and many notes
- Notes saved with `localStorage`, so they survive a page refresh
- "Clear all" button that asks for confirmation first (bonus)
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run locally

1. Download or clone the repository:
   `git clone https://github.com/YOUR-USERNAME/quicknotes-app.git`
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server** (or simply double-click `index.html` to open it in your browser).

There is nothing to install: the project uses no libraries or build tools.

## What I learned

- How to structure a page with semantic tags (`header`, `main`, `section`, `footer`) and link every `<label>` to its input with matching `for` and `id` values.
- How to lay out a form with Flexbox and use a media query to stack it on phones.
- The render pattern: change the data array, save it, then rebuild the list from scratch with `createElement` and `textContent`, which keeps user text safe.
- How `localStorage` works with `JSON.stringify` and `JSON.parse`, and why loading should be wrapped in `try`/`catch` in case the saved data is broken.
- How to use `filter`, `includes` and `toLowerCase` to build a case-insensitive search, and how small details like singular and plural wording make an app feel polished.
