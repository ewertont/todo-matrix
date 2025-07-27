import { Task, TaskFormData } from '@/types/task';
import { TaskSection } from './TaskSection';
import styles from '@/styles/MatrixTodoList.module.css';

interface TasksPanelProps {
  pendingTasks: Task[];
  completedTasks: Task[];
  onAddTask: (formData: TaskFormData) => void;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TasksPanel = ({
  pendingTasks,
  completedTasks,
  onAddTask,
  onCompleteTask,
  onDeleteTask,
}: TasksPanelProps) => {
  return (
    <div className={styles.tasksPanel}>
      <TaskSection
        title="PENDING TASKS"
        tasks={pendingTasks}
        statusClass={styles.statusActive}
        onComplete={onCompleteTask}
        onAddTask={onAddTask}
      />
      <TaskSection
        title="COMPLETED TASKS"
        tasks={completedTasks}
        isCompleted
        statusClass={styles.statusStopped}
        onDelete={onDeleteTask}
      />
    </div>
  );
};