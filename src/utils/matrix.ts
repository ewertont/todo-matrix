export const createMatrixRain = (): void => {
  const container = document.getElementById('matrixBg');
  if (!container) return;

  container.innerHTML = '';

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  const columnCount = 50;
  const charactersPerColumn = 20;

  for (let i = 0; i < columnCount; i++) {
    const column = createMatrixColumn(chars, charactersPerColumn);
    container.appendChild(column);
  }
};

const createMatrixColumn = (chars: string, characterCount: number): HTMLElement => {
  const column = document.createElement('div');
  column.className = 'matrixColumn';
  column.style.left = `${Math.random() * 100}%`;
  column.style.animationDuration = `${Math.random() * 3 + 2}s`;
  column.style.animationDelay = `${Math.random() * 2}s`;

  let columnText = '';
  for (let j = 0; j < characterCount; j++) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    columnText += `${randomChar}<br>`;
  }

  column.innerHTML = columnText;
  return column;
};