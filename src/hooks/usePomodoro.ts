import { useState, useEffect } from 'react';
import { PomodoroMode, PomodoroState } from '@/types/pomodoro';
import {
  createInitialPomodoroState,
  switchMode,
  startTimer,
  pauseTimer,
  resetTimer,
  tickTimer,
} from '@/services/pomodoroService';

export const usePomodoro = () => {
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>(
    createInitialPomodoroState()
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (pomodoroState.status === 'RUNNING' && pomodoroState.timeLeft > 0) {
      interval = setInterval(() => {
        setPomodoroState(currentState => tickTimer(currentState));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [pomodoroState.status, pomodoroState.timeLeft]);

  const handleModeChange = (mode: PomodoroMode) => {
    setPomodoroState(currentState => switchMode(currentState, mode));
  };

  const handleStart = () => {
    setPomodoroState(currentState => startTimer(currentState));
  };

  const handlePause = () => {
    setPomodoroState(currentState => pauseTimer(currentState));
  };

  const handleReset = () => {
    setPomodoroState(currentState => resetTimer(currentState));
  };

  return {
    pomodoroState,
    handleModeChange,
    handleStart,
    handlePause,
    handleReset,
  };
};