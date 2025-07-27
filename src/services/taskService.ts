import { Task, TaskFormData } from '@/types/task';

export const createTask = (formData: TaskFormData): Task => ({
  id: generateTaskId(),
  description: formData.description,
  effort: formData.effort,
  timeEstimate: formData.timeEstimate,
  completed: false,
});

export const completeTask = (task: Task): Task => ({
  ...task,
  completed: true,
  completedAt: new Date(),
});

export const isValidTaskDescription = (description: string): boolean => {
  return description.trim().length > 0;
};

const generateTaskId = (): string => {
  return String(Date.now()).slice(-3);
};