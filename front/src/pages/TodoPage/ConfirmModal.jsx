import styles from './ConfirmModal.module.css';

/**
 * ConfirmModal — Generic confirmation dialog for destructive actions
 */
export default function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.modal} animate-scale-in`} role="alertdialog"
        aria-modal="true" aria-label="Confirmar ação">

        <div className={styles.icon}>🗑️</div>
        <h2 className={styles.message}>{message}</h2>
        <p className={styles.hint}>Esta ação não pode ser desfeita.</p>

        <div className={styles.actions}>
          <button id="confirm-cancel" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button id="confirm-delete" className={styles.deleteBtn} onClick={onConfirm}>
            Sim, deletar
          </button>
        </div>
      </div>
    </div>
  );
}
