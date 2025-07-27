import { PomodoroMode } from '@/types/pomodoro';
import styles from '@/styles/MatrixTodoList.module.css';

interface PomodoroTabsProps {
  activeMode: PomodoroMode;
  onModeChange: (mode: PomodoroMode) => void;
}

const POMODORO_MODES: PomodoroMode[] = ['POMODORO', 'SHORT_BREAK', 'LONG_BREAK'];

export const PomodoroTabs = ({ activeMode, onModeChange }: PomodoroTabsProps) => {
  return (
    <div className={styles.pomodoroTabs}>
      {POMODORO_MODES.map((mode) => (
        <button
          key={mode}
          className={`${styles.tab} ${activeMode === mode ? styles.active : ''}`}
          onClick={() => onModeChange(mode)}
        >
          {mode.replace('_', ' ')}
        </button>
      ))}
    </div>
  );
};