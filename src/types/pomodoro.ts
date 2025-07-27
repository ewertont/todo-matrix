export type PomodoroMode = 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK';
export type TimerStatus = 'STOPPED' | 'RUNNING' | 'PAUSED';

export interface PomodoroState {
  mode: PomodoroMode;
  status: TimerStatus;
  timeLeft: number;
  sessions: number;
  totalTime: number;
}

export interface TimeSettings {
  POMODORO: number;
  SHORT_BREAK: number;
  LONG_BREAK: number;
}