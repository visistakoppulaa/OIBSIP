# TaskFlow — Interactive To-Do Web App

TaskFlow is a feature-packed, high-performance, interactive task management web application built with **React**, **TypeScript**, and **Tailwind CSS**. It is designed to help users streamline daily productivity with clean organization, real-time list indicators, inline editing, subtask checklists, productivity stats, focus timers, and localStorage persistence.

---

## 🚀 Key Features & Feature Checklist Verification

### Core Objective Requirements (Task 3 Checklist)
- [x] **Task Creation Input & Add Task Button**: Input field with instant task creation, priority badges, category tags, due dates, and step-by-step subtasks.
- [x] **Immediate Pending List View**: Newly created tasks instantly populate the **Pending Tasks** list without requiring page reloads.
- [x] **"Mark Complete" Toggle**: One-click checkbox toggle moves tasks back and forth between the **Pending Tasks** and **Completed Tasks** lists with celebratory confetti animations.
- [x] **Inline Task Editing**: Each task includes an **Edit** button that converts title, description, priority, category, and due dates into inline editable fields with live save & cancel controls.
- [x] **Task Deletion**: **Delete** button with soft confirmation popover to permanently remove tasks from either pending or completed lists.
- [x] **Task Count Indicators**: Dynamic indicators displaying **"X pending"** above the Pending Tasks section and **"Y completed"** above the Completed Tasks section.
- [x] **(Bonus) Dynamic Timestamps**: Automatically calculates and displays readable timestamps showing when each task was created (e.g. *"Added 10m ago"*, *"Today at 2:30 PM"*) and completed (e.g. *"Completed Just now"*).
- [x] **(Bonus) localStorage Persistence**: All task state, subtasks, priorities, and theme preferences automatically save to browser `localStorage` and persist across page refreshes or browser restarts.
- [x] **Empty State Messaging**: User-friendly empty state cards displayed when either list has zero items, providing helpful guidance.

### 🌟 Creative & Unique Bonus Features
- **Priority Level Badges**: Assign High, Medium, or Low priorities with color-coded accent indicators and quick priority filtering.
- **Category Tags**: Categorize tasks into Work, Personal, Urgent, Health, Learning, or General tags.
- **Subtask Checklists**: Add step-by-step subtasks with interactive progress bars within any individual task.
- **Focus Timer (Pomodoro Mode)**: Embedded focus countdown timer with progress ring to conduct dedicated deep-work sessions for any task.
- **Productivity Analytics Dashboard**: Live modal showing completion percentages, high-priority counts, subtask totals, and progress visuals.
- **Data Backup & Restore (JSON)**: Export tasks to JSON file or clipboard for easy backup and cross-device sync, with import capabilities.
- **Dark Mode Support**: Fluid light/dark theme switching with system auto-detection and persistent preferences.
- **Search & Multi-Criteria Filter Bar**: Instant search across titles, descriptions, and subtasks, plus category filter pills and sorting options (Newest, Oldest, Priority, Due Date, A-Z).

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Google Fonts (Plus Jakarta Sans & Outfit)
- **Icons**: Lucide React (`lucide-react`)
- **Build Tool**: Vite 6
- **Animations & Effects**: Canvas Confetti particle engine + CSS Transitions

### Directory Structure
```
├── src/
│   ├── components/
│   │   ├── ExportModal.tsx        # Backup JSON export & restore modal
│   │   ├── FocusTimerModal.tsx    # Task focus timer / pomodoro modal
│   │   ├── Header.tsx             # Brand header, quick stats & theme toggle
│   │   ├── StatsModal.tsx         # Productivity analytics dashboard
│   │   ├── TaskFilterBar.tsx      # Search bar, category pills & sort controls
│   │   ├── TaskInput.tsx          # Task creation form with expand options
│   │   ├── TaskItem.tsx           # Individual task card with inline edit & checklist
│   │   └── TaskListSection.tsx    # Section wrapper with count indicators & empty states
│   ├── utils/
│   │   ├── confetti.ts            # Canvas confetti explosion particle engine
│   │   └── storage.ts             # localStorage sync, timestamp formatters & stats calculation
│   ├── types.ts                   # TypeScript interfaces & types
│   ├── App.tsx                    # Main state manager & application layout
│   ├── main.tsx                   # React root entry point
│   └── index.css                  # Tailwind styles & custom typography setup
├── index.html                     # HTML5 shell with Google Fonts
├── metadata.json                  # Application metadata
├── package.json                   # Project dependencies & scripts
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 💻 Getting Started Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🧪 Self-Sourcing & Persistence Guide

TaskFlow implements custom `localStorage` read/write handlers located in `src/utils/storage.ts`:
- **Read**: `loadStoredTasks()` inspects `localStorage` for `taskflow_app_tasks_v1`. If present, it parses and initializes state; if empty, it seeds friendly starter demo tasks.
- **Write**: `saveStoredTasks()` serializes the state to JSON on every task modification via a `useEffect` hook.

---

## 📝 License
Apache-2.0 License.
