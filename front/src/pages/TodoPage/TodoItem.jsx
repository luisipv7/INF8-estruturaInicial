import styles from './TodoItem.module.css';

/**
 * TodoItem — Single todo card with toggle, edit, delete actions
 */
export default function TodoItem({ todo, onToggle, onEdit, onDelete, style }) {
  return (
    <li className={`${styles.item} animate-fade-in`} style={style}>
      {/* Checkbox */}
      <button
        id={`toggle-${todo.id}`}
        className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
        onClick={onToggle}
        aria-label={todo.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {todo.completed && <CheckIcon />}
      </button>

      {/* Content */}
      <div className={styles.content}>
        <span className={`${styles.titleText} ${todo.completed ? styles.done : ''}`}>
          {todo.title}
        </span>
        {todo.description && (
          <p className={styles.desc}>{todo.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          id={`edit-${todo.id}`}
          className={styles.actionBtn}
          onClick={onEdit}
          aria-label="Editar"
        >
          <EditIcon />
        </button>
        <button
          id={`delete-${todo.id}`}
          className={`${styles.actionBtn} ${styles.danger}`}
          onClick={onDelete}
          aria-label="Deletar"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

/* ---- Inline SVG icons ---- */
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}
