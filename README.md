# mylocalfit

Simple browser-based fitness app for tracking exercises and timers.

Getting started

1. Open `index.html` in a browser or serve with a static server.
2. Files of interest: `components/ui.js`, `logic/app.js`, `logic/timer.js`, `data/exercises.js`.

Contributing

- Create a branch, push it to GitHub, and open a pull request for review.

Try it locally
-------------

Prerequisites: a modern browser. Optional: `python` or `node` to run a simple static server.

Quick options:

- Open directly: double-click `index.html` to open in your default browser (some features like AudioContext/vibration may require serving over `http`).

- Using Python (cross-platform):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

- Using Node (if you have `npx`):

```bash
npx serve . -l 5000
# then open http://localhost:5000
```

What to try
-----------

- Dashboard: view stats and start a built-in routine.
- Library: browse exercises, click `＋ Add Exercise` to create a new exercise, or `✏️ Edit` to modify an existing one.
- Custom routines: build a routine by tapping `+` on exercises, name it, and `Save Routine`.
- Workout: start a session, use Pause/Resume/Skip controls, and finish to record progress.

Notes
-----

- Custom exercises and routines are stored in `localStorage` under keys starting with `mylocalfit_` so they persist in your browser.
- To contribute: fork, create a branch, implement changes, and open a PR back to this repository.
