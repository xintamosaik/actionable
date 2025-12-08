# Actionable 🧾

A small-but-serious personal task manager built with React + TypeScript.

It started as the classic “TODO app” practice project — and turned into a local-first, priority-driven task table that I actually use.

---

## ✨ Features

- ✅ **Inline editable tasks**  
  Click any task, responsible, notes, etc. to edit directly in the table.

- 🎯 **Priority scoring**
  - Priority = `Value × Urgency`
  - Urgency is calculated from:
    - how many days are left until the due date
    - how much effort the task will take (Minutes → Months)
  - Tasks can be **sorted by priority** to show what really matters first.

- ⏱️ **Effort & urgency controls**
  - Effort options: `MINUTES`, `HOURS`, `DAYS`, `WEEKS`, `MONTHS`
  - Urgency is inferred from time remaining vs. effort
  - Visual color coding for value, effort, urgency

- 📥 **Import / Export**
  - Export all tasks as `todos.json`
  - Import them again later (or on another machine)  
    → no backend needed.

- 💾 **Local-first**
  - All data is stored in `localStorage`
  - Key: `todox.todos`

- 🧮 **Smart-ish due date handling**
  - Shows “_X days left_”
  - Treats missing due dates as a default time horizon (for urgency)

---

## 🧱 Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) with `@vitejs/plugin-react-swc`
- ESLint + `typescript-eslint`
- LocalStorage for persistence

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Type-check & build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
