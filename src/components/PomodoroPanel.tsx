import { PomodoroMode, PomodoroState } from '@/types/pomodoro';
import { PomodoroTabs } from './PomodoroTabs';
import { TimerDisplay } from './TimerDisplay';
import { PomodoroControls } from './PomodoroControls';
import { PomodoroStats } from './PomodoroStats';
import styles from '@/styles/MatrixTodoList.module.css';

interface PomodoroPanelProps {
  pomodoroState: PomodoroState;
  onModeChange: (mode: PomodoroMode) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const PomodoroPanel = ({
  pomodoroState,
  onModeChange,
  onStart,
  onPause,
  onReset,
}: PomodoroPanelProps) => {
  const { mode, status, timeLeft, sessions, totalTime } = pomodoroState;

  return (
    <div className={styles.pomodoroPanel}>
      <PomodoroTabs
        activeMode={mode}
        onModeChange={onModeChange}
      />

      <TimerDisplay
        timeLeft={timeLeft}
        status={status}
      />

      <PomodoroControls
        status={status}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
      />

      <PomodoroStats
        sessions={sessions}
        totalTime={totalTime}
      />
    </div>
  );
};