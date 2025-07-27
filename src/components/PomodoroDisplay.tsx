import { TimerStatus } from '@/types/pomodoro';
import { formatTime } from '@/utils/time';
import { getTimerStatusText } from '@/services/pomodoroService';
import styles from '@/styles/MatrixTodoList.module.css';

interface TimerDisplayProps {
  timeLeft: number;
  status: TimerStatus;
}

export const TimerDisplay = ({ timeLeft, status }: TimerDisplayProps) => {
  const getStatusIndicatorClass = () => {
    switch (status) {
      case 'RUNNING': return styles.statusActive;
      case 'PAUSED': return styles.statusPaused;
      default: return styles.statusStopped;
    }
  };

  return (
    <div className={styles.timerDisplay}>
      <div className={styles.timerTime}>{formatTime(timeLeft)}</div>
      <div style={{ color: '#008f11', fontSize: '0.9rem', marginBottom: '20px' }}>
        <span className={`${styles.statusIndicator} ${getStatusIndicatorClass()}`}></span>
        {getTimerStatusText(status)}
      </div>
    </div>
  );
};