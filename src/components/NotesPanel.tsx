import styles from '@/styles/MatrixTodoList.module.css';

interface NotesPanelProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  onSaveNotes: () => void;
}

export const NotesPanel = ({ notes, onNotesChange, onSaveNotes }: NotesPanelProps) => {
  return (
    <div className={styles.notesPanel}>
      <h3 style={{ color: '#00ff41', marginBottom: '15px', textAlign: 'center' }}>
        SYSTEM NOTES
      </h3>
      <textarea
        className={styles.notesTextarea}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder=">> ENTER YOUR NOTES HERE_"
      />
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onSaveNotes}
        >
          SAVE NOTES
        </button>
      </div>
    </div>
  );
};