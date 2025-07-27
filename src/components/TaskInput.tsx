import { useState, KeyboardEvent } from 'react';
import { TaskFormData } from '@/types/task';
import styles from '@/styles/MatrixTodoList.module.css';

interface TaskInputProps {
  onAddTask: (formData: TaskFormData) => void;
}

export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [description, setDescription] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (!description.trim()) return;

    const formData: TaskFormData = {
      description,
      effort: 'MEDIUM',
      timeEstimate: '1h',
    };

    onAddTask(formData);
    setDescription('');
  };

  return (
    <input
      type="text"
      className={styles.taskInput}
      placeholder=">> ADD NEW TASK_"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};