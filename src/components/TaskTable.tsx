import { Task } from '@/types/task';
import styles from '@/styles/MatrixTodoList.module.css';

interface TaskTableProps {
  tasks: Task[];
  onComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  isCompleted?: boolean;
}

export const TaskTable = ({
  tasks,
  onComplete,
  onDelete,
  isCompleted = false
}: TaskTableProps) => {
  return (
    <table className={styles.taskTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>DESCRIPTION</th>
          <th>EFFORT</th>
          <th>{isCompleted ? 'COMPLETED' : 'TIME EST.'}</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task.id}
            style={isCompleted ? { opacity: 0.7 } : undefined}
          >
            <td>{task.id}</td>
            <td>{task.description}</td>
            <td>{task.effort}</td>
            <td>{isCompleted ? 'DONE' : task.timeEstimate}</td>
            <td>
              {!isCompleted && onComplete && (
                <button
                  className={`${styles.btn} ${styles.btnSm}`}
                  onClick={() => onComplete(task.id)}
                >
                  COMPLETE
                </button>
              )}
              {isCompleted && onDelete && (
                <button
                  className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                  onClick={() => onDelete(task.id)}
                >
                  DELETE
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};