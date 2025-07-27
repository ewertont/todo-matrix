import { useState } from 'react';
import { Task, TaskFormData } from '@/types/task';
import { createTask, completeTask, isValidTaskDescription } from '@/services/taskService';

const INITIAL_TASKS: Task[] = [
  {
    id: '001',
    description: 'Implement user authentication',
    effort: 'HIGH',
    timeEstimate: '2h 30m',
    completed: false
  },
  {
    id: '002',
    description: 'Design matrix interface',
    effort: 'MEDIUM',
    timeEstimate: '1h 45m',
    completed: false
  },
  {
    id: '003',
    description: 'Setup database connection',
    effort: 'LOW',
    timeEstimate: '45m',
    completed: false
  },
];

const INITIAL_COMPLETED_TASKS: Task[] = [
  {
    id: '004',
    description: 'Project setup and configuration',
    effort: 'LOW',
    timeEstimate: '30m',
    completed: true,
    completedAt: new Date()
  },
  {
    id: '005',
    description: 'Research Matrix design patterns',
    effort: 'MEDIUM',
    timeEstimate: '1h 15m',
    completed: true,
    completedAt: new Date()
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [completedTasks, setCompletedTasks] = useState<Task[]>(INITIAL_COMPLETED_TASKS);

  const addTask = (formData: TaskFormData) => {
    if (!isValidTaskDescription(formData.description)) return;

    const newTask = createTask(formData);
    setTasks(currentTasks => [...currentTasks, newTask]);
  };

  const markTaskAsCompleted = (taskId: string) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (!taskToComplete) return;

    const completedTask = completeTask(taskToComplete);
    setCompletedTasks(currentCompleted => [...currentCompleted, completedTask]);
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
  };

  const deleteCompletedTask = (taskId: string) => {
    setCompletedTasks(currentCompleted =>
      currentCompleted.filter(task => task.id !== taskId)
    );
  };

  return {
    tasks,
    completedTasks,
    addTask,
    markTaskAsCompleted,
    deleteCompletedTask,
  };
};