import { formatTotalTime } from '@/utils/time';

interface PomodoroStatsProps {
  sessions: number;
  totalTime: number;
}

export const PomodoroStats = ({ sessions, totalTime }: PomodoroStatsProps) => {
  const maxSessions = 4;

  return (
    <div style={{
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#008f11'
    }}>
      SESSION: {sessions}/{maxSessions} | TOTAL: {formatTotalTime(totalTime)}
    </div>
  );
};