import { useState } from 'react';

const INITIAL_NOTES = '// System Log:';

export const useNotes = () => {
  const [notes, setNotes] = useState<string>(INITIAL_NOTES);

  const updateNotes = (newNotes: string) => {
    setNotes(newNotes);
  };

  const saveNotes = () => {
    console.log('Notes saved:', notes);
  };

  return {
    notes,
    updateNotes,
    saveNotes,
  };
};