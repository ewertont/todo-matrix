export interface Task {
  id: string;
  description: string;
  effort: TaskEffort;
  timeEstimate: string;
  completed: boolean;
  completedAt?: Date;
}

export type TaskEffort = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskFormData {
  description: string;
  effort: TaskEffort;
  timeEstimate: string;
}