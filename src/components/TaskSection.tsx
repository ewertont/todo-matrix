import { Task, TaskFormData } from '@/types/task';
import { TaskTable } from './TaskTable';
import { TaskInput } from './TaskInput';
import styles from '@/styles/MatrixTodoList.module.css';

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  isCompleted?: boolean;
  statusClass: string;
  onComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onAddTask?: (formData: TaskFormData) => void;
}

export const TaskSection = ({
  title,
  tasks,
  isCompleted = false,
  statusClass,
  onComplete,
  onDelete,
  onAddTask,
}: TaskSectionProps) => {
  return (
    <div className={styles.taskSection}>
      <h3>
        <span className={`${styles.statusIndicator} ${statusClass}`}></span>
        {title}
      </h3>
      <TaskTable
        tasks={tasks}
        onComplete={onComplete}
        onDelete={onDelete}
        isCompleted={isCompleted}
      />
      {!isCompleted && onAddTask && <TaskInput onAddTask={onAddTask} />}
    </div>
  );
};  