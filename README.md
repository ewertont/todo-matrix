This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Estrutura de Pastas

├── app/
│   └── page.tsx                    # Página principal
├── components/                     # Componentes UI
│   ├── MatrixBackground.tsx
│   ├── MatrixHeader.tsx
│   ├── TaskTable.tsx
│   ├── TaskInput.tsx
│   ├── TaskSection.tsx
│   ├── TasksPanel.tsx
│   ├── NotesPanel.tsx
│   ├── PomodoroTabs.tsx
│   ├── TimerDisplay.tsx
│   ├── PomodoroControls.tsx
│   ├── PomodoroStats.tsx
│   └── PomodoroPanel.tsx
├── hooks/                          # Custom hooks
│   ├── usePomodoro.ts
│   ├── useTasks.ts
│   └── useNotes.ts
├── services/                       # Lógica de negócio
│   ├── taskService.ts
│   └── pomodoroService.ts
├── types/                          # Definições de tipos
│   ├── task.ts
│   └── pomodoro.ts
├── utils/                          # Funções utilitárias
│   ├── time.ts
│   └── matrix.ts
└── styles/
    └── MatrixTodoList.module.css