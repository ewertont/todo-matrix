'use client';

import { MatrixBackground } from '@/components/MatrixBackground';
import { MatrixHeader } from '@/components/MatrixHeader';
import { TasksPanel } from '@/components/TasksPanel';
import { NotesPanel } from '@/components/NotesPanel';
import { PomodoroPanel } from '@/components/PomodoroPanel';
import { useTasks } from '@/hooks/useTasks';
import { useNotes } from '@/hooks/useNotes';
import { usePomodoro } from '@/hooks/usePomodoro';
import styles from '@/styles/MatrixTodoList.module.css';

export default function Home() {
  const {
    tasks,
    completedTasks,
    addTask,
    markTaskAsCompleted,
    deleteCompletedTask,
  } = useTasks();

  const { notes, updateNotes, saveNotes } = useNotes();

  const {
    pomodoroState,
    handleModeChange,
    handleStart,
    handlePause,
    handleReset,
  } = usePomodoro();

  return (
    <div className={styles.container}>
      <MatrixBackground />
      <MatrixHeader />

      <div className={styles.mainLayout}>
        <TasksPanel
          pendingTasks={tasks}
          completedTasks={completedTasks}
          onAddTask={addTask}
          onCompleteTask={markTaskAsCompleted}
          onDeleteTask={deleteCompletedTask}
        />

        <NotesPanel
          notes={notes}
          onNotesChange={updateNotes}
          onSaveNotes={saveNotes}
        />

        <PomodoroPanel
          pomodoroState={pomodoroState}
          onModeChange={handleModeChange}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}