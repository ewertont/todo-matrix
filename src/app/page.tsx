'use client';

import React, { useState, useEffect } from 'react';
import styles from './MatrixTodoList.module.css';

interface Task {
  id: string;
  description: string;
  effort: 'LOW' | 'MEDIUM' | 'HIGH';
  timeEstimate: string;
  completed: boolean;
  completedAt?: Date;
}

type PomodoroMode = 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK';
type TimerStatus = 'STOPPED' | 'RUNNING' | 'PAUSED';

export default function Home() {
  // States para tarefas
  const [tasks, setTasks] = useState<Task[]>([
    { id: '001', description: 'Implement user authentication', effort: 'HIGH', timeEstimate: '2h 30m', completed: false },
    { id: '002', description: 'Design matrix interface', effort: 'MEDIUM', timeEstimate: '1h 45m', completed: false },
    { id: '003', description: 'Setup database connection', effort: 'LOW', timeEstimate: '45m', completed: false },
  ]);

  const [completedTasks, setCompletedTasks] = useState<Task[]>([
    { id: '004', description: 'Project setup and configuration', effort: 'LOW', timeEstimate: '30m', completed: true, completedAt: new Date() },
    { id: '005', description: 'Research Matrix design patterns', effort: 'MEDIUM', timeEstimate: '1h 15m', completed: true, completedAt: new Date() },
  ]);

  // States para nova tarefa
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // States para anotações
  const [notes, setNotes] = useState(`// System Log:`);

  // States para Pomodoro
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>('POMODORO');
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('STOPPED');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos em segundos
  const [sessions, setSessions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Configurações de tempo
  const timeSettings = {
    POMODORO: 25 * 60,
    SHORT_BREAK: 5 * 60,
    LONG_BREAK: 15 * 60,
  };

  // Effect para timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerStatus === 'RUNNING' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setTimerStatus('STOPPED');
            if (pomodoroMode === 'POMODORO') {
              setSessions(prev => prev + 1);
              setTotalTime(prev => prev + timeSettings.POMODORO);
            }
            return timeSettings[pomodoroMode];
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerStatus, timeLeft, pomodoroMode, timeSettings]);

  // Effect para Matrix Rain
  useEffect(() => {
    createMatrixRain();
  }, []);

  // Functions
  const createMatrixRain = () => {
    const container = document.getElementById('matrixBg');
    if (!container) return;

    // Limpar container anterior
    container.innerHTML = '';

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

    for (let i = 0; i < 50; i++) {
      const column = document.createElement('div');
      column.className = styles.matrixColumn;
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDuration = (Math.random() * 3 + 2) + 's';
      column.style.animationDelay = Math.random() * 2 + 's';

      let columnText = '';
      for (let j = 0; j < 20; j++) {
        columnText += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
      }
      column.innerHTML = columnText;

      container.appendChild(column);
    }
  };

  const addTask = () => {
    if (!newTaskDescription.trim()) return;

    const newTask: Task = {
      id: String(Date.now()).slice(-3),
      description: newTaskDescription,
      effort: 'MEDIUM',
      timeEstimate: '1h',
      completed: false,
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskDescription('');
  };

  const completeTask = (taskId: string) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (!taskToComplete) return;

    const completedTask = { ...taskToComplete, completed: true, completedAt: new Date() };
    setCompletedTasks(prev => [...prev, completedTask]);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const deleteCompletedTask = (taskId: string) => {
    setCompletedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handlePomodoroModeChange = (mode: PomodoroMode) => {
    setPomodoroMode(mode);
    setTimeLeft(timeSettings[mode]);
    setTimerStatus('STOPPED');
  };

  const startTimer = () => {
    setTimerStatus('RUNNING');
  };

  const pauseTimer = () => {
    setTimerStatus('PAUSED');
  };

  const resetTimer = () => {
    setTimerStatus('STOPPED');
    setTimeLeft(timeSettings[pomodoroMode]);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTotalTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const saveNotes = () => {
    // Aqui você implementaria a lógica de salvar as anotações
    console.log('Notes saved:', notes);
  };

  const getStatusIndicatorClass = () => {
    switch (timerStatus) {
      case 'RUNNING': return styles.statusActive;
      case 'PAUSED': return styles.statusPaused;
      default: return styles.statusStopped;
    }
  };

  const getTimerStatusText = () => {
    switch (timerStatus) {
      case 'RUNNING': return 'SYSTEM ACTIVE';
      case 'PAUSED': return 'SYSTEM PAUSED';
      default: return 'SYSTEM READY';
    }
  };

  return (
    <div className={styles.container}>
      {/* Matrix Rain Background */}
      <div className={styles.matrixBg} id="matrixBg" />

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.glitch}>MATRIX TODO SYSTEM</h1>
        <p>// TASK MANAGEMENT PROTOCOL ACTIVE //</p>
      </header>

      {/* Layout Principal */}
      <div className={styles.mainLayout}>
        {/* Painel de Tarefas */}
        <div className={styles.tasksPanel}>
          {/* Lista de Tarefas Pendentes */}
          <div className={styles.taskSection}>
            <h3>
              <span className={`${styles.statusIndicator} ${styles.statusActive}`}></span>
              PENDING TASKS
            </h3>
            <table className={styles.taskTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DESCRIPTION</th>
                  <th>EFFORT</th>
                  <th>TIME EST.</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.description}</td>
                    <td>{task.effort}</td>
                    <td>{task.timeEstimate}</td>
                    <td>
                      <button
                        className={`${styles.btn} ${styles.btnSm}`}
                        onClick={() => completeTask(task.id)}
                      >
                        COMPLETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <input
              type="text"
              className={styles.taskInput}
              placeholder=">> ADD NEW TASK_"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Lista de Tarefas Concluídas */}
          <div className={styles.taskSection}>
            <h3>
              <span className={`${styles.statusIndicator} ${styles.statusStopped}`}></span>
              COMPLETED TASKS
            </h3>
            <table className={styles.taskTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DESCRIPTION</th>
                  <th>EFFORT</th>
                  <th>COMPLETED</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((task) => (
                  <tr key={task.id} style={{ opacity: 0.7 }}>
                    <td>{task.id}</td>
                    <td>{task.description}</td>
                    <td>{task.effort}</td>
                    <td>DONE</td>
                    <td>
                      <button
                        className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                        onClick={() => deleteCompletedTask(task.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painel de Anotações */}
        <div className={styles.notesPanel}>
          <h3 style={{ color: '#00ff41', marginBottom: '15px', textAlign: 'center' }}>
            SYSTEM NOTES
          </h3>
          <textarea
            className={styles.notesTextarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder=">> ENTER YOUR NOTES HERE_"
          />
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={saveNotes}
            >
              SAVE NOTES
            </button>
          </div>
        </div>

        {/* Painel Pomodoro */}
        <div className={styles.pomodoroPanel}>
          <div className={styles.pomodoroTabs}>
            {(['POMODORO', 'SHORT_BREAK', 'LONG_BREAK'] as PomodoroMode[]).map((mode) => (
              <button
                key={mode}
                className={`${styles.tab} ${pomodoroMode === mode ? styles.active : ''}`}
                onClick={() => handlePomodoroModeChange(mode)}
              >
                {mode.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className={styles.timerDisplay}>
            <div className={styles.timerTime}>{formatTime(timeLeft)}</div>
            <div style={{ color: '#008f11', fontSize: '0.9rem', marginBottom: '20px' }}>
              <span className={`${styles.statusIndicator} ${getStatusIndicatorClass()}`}></span>
              {getTimerStatusText()}
            </div>
          </div>

          <div className={styles.pomodoroControls}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={startTimer}
              disabled={timerStatus === 'RUNNING'}
            >
              START
            </button>
            <button
              className={styles.btn}
              onClick={pauseTimer}
              disabled={timerStatus === 'STOPPED'}
            >
              PAUSE
            </button>
            <button
              className={`${styles.btn} ${styles.btnDanger}`}
              onClick={resetTimer}
            >
              RESET
            </button>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#008f11' }}>
            SESSION: {sessions}/4 | TOTAL: {formatTotalTime(totalTime)}
          </div>
        </div>
      </div>
    </div>
  );
};