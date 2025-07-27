'use client';

import { useEffect } from 'react';
import { createMatrixRain } from '@/utils/matrix';
import styles from '@/styles/MatrixTodoList.module.css';

export const MatrixBackground = () => {
  useEffect(() => {
    createMatrixRain();
  }, []);

  return <div className={styles.matrixBg} id="matrixBg" />;
};
