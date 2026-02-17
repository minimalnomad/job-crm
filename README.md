# Job Tracker CRM (React + TypeScript + MUI + DnD Kit)

A lightweight, personal job-tracking CRM inspired by Huntr.
Built with React architecture, local persistence, and drag-and-drop interactions.
---

## 🚀 Features

### Core

- Add / Edit / Delete job applications
- Kanban-style job stages
  - applied -> interview -> offer -> rejected
- Tags (e.g. `frontend`, `remote`, `urgent`)
- Notes & company contact information
- Filter by search, stage, tag
- LocalStorage persistence
- Responsive UI using Material UI

### Interactions

- Drag and drop cards between stages (dnd-kit)
- Reorder cards within the same stage

---

## 🏗 Architecture

This project follows a layered and component-driven architecture:

### Design Principles

- Component-based UI with reusable patterns (Card, Dialog, Filters)
- State orchestration handled via custom hooks
- Decoupled logic (filtering, drag-and-drop, persistence)

### Layered Structure

- **UI Layer** – MUI components & interaction views
- **Logic Layer** – Custom hooks (`useJobFilters`, `useJobBoardDrag`)
- **Domain Layer** – Type definitions (JobApp, Stage)
- **Persistence Layer** – LocalStorage-backed repo (`repo.ts`)

This structure keeps visual components light while isolating logic, improving testability and maintainability.

---

## 🧪 Testing (Vitest + React Testing Library)

Implemented unit tests for key logic:

- `JobAppCard`
- `SearchFilterBar`
- `useJobFilters`
- `useJobBoardDrag` (drag -> reorder & stage change)

Focus:

- Input/output correctness
- Stable filtering logic
- Drag-and-drop behaviour without relying on DOM
- Mocked persistence layer (`upsertApp`)

🧪 Running Tests

```js
npx vitest
```

---

## 🔧 Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- dnd-kit
- Vitest / React Testing Library
- LocalStorage

## ▶️ Running the App Locally

```js
pnpm install
pnpm dev
```

## Deployment

[Live Demo](https://job-crm.netlify.app/)
