import { PomodoroMode, PomodoroState, TimeSettings, TimerStatus } from '@/types/pomodoro';

export const TIME_SETTINGS: TimeSettings = {
  POMODORO: 25 * 60,
  SHORT_BREAK: 5 * 60,
  LONG_BREAK: 15 * 60,
};

export const createInitialPomodoroState = (): PomodoroState => ({
  mode: 'POMODORO',
  status: 'STOPPED',
  timeLeft: TIME_SETTINGS.POMODORO,
  sessions: 0,
  totalTime: 0,
});

export const switchMode = (
  currentState: PomodoroState,
  newMode: PomodoroMode
): PomodoroState => ({
  ...currentState,
  mode: newMode,
  timeLeft: TIME_SETTINGS[newMode],
  status: 'STOPPED',
});

export const startTimer = (currentState: PomodoroState): PomodoroState => ({
  ...currentState,
  status: 'RUNNING',
});

export const pauseTimer = (currentState: PomodoroState): PomodoroState => ({
  ...currentState,
  status: 'PAUSED',
});

export const resetTimer = (currentState: PomodoroState): PomodoroState => ({
  ...currentState,
  status: 'STOPPED',
  timeLeft: TIME_SETTINGS[currentState.mode],
});

export const tickTimer = (currentState: PomodoroState): PomodoroState => {
  if (currentState.timeLeft <= 1) {
    return completeSession(currentState);
  }

  return {
    ...currentState,
    timeLeft: currentState.timeLeft - 1,
  };
};

const completeSession = (currentState: PomodoroState): PomodoroState => {
  const newSessions = currentState.mode === 'POMODORO'
    ? currentState.sessions + 1
    : currentState.sessions;

  const newTotalTime = currentState.mode === 'POMODORO'
    ? currentState.totalTime + TIME_SETTINGS.POMODORO
    : currentState.totalTime;

  return {
    ...currentState,
    status: 'STOPPED',
    timeLeft: TIME_SETTINGS[currentState.mode],
    sessions: newSessions,
    totalTime: newTotalTime,
  };
};

export const getTimerStatusText = (status: TimerStatus): string => {
  const statusMap = {
    RUNNING: 'SYSTEM ACTIVE',
    PAUSED: 'SYSTEM PAUSED',
    STOPPED: 'SYSTEM READY',
  };

  return statusMap[status];
};