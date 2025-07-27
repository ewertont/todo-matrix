import { TimerStatus } from '@/types/pomodoro';
import styles from '@/styles/MatrixTodoList.module.css';

interface PomodoroControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const PomodoroControls = ({
  status,
  onStart,
  onPause,
  onReset
}: PomodoroControlsProps) => {
  return (
    <div className={styles.pomodoroControls}>
      <button
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={onStart}
        disabled={status === 'RUNNING'}
      >
        START
      </button>
      <button
        className={styles.btn}
        onClick={onPause}
        disabled={status === 'STOPPED'}
      >
        PAUSE
      </button>
      <button
        className={`${styles.btn} ${styles.btnDanger}`}
        onClick={onReset}
      >
        RESET
      </button>
    </div>
  );
};