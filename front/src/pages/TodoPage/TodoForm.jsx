import { useState } from 'react';
import styles from './TodoForm.module.css';

/**
 * TodoForm — Modal for creating or editing a todo
 * @param {Object} todo  — if provided, form is in "edit" mode
 */
export default function TodoForm({ todo, onSubmit, onClose }) {
  const isEdit = Boolean(todo);
  const [title, setTitle]    = useState(todo?.title || '');
  const [desc, setDesc]      = useState(todo?.description || '');
  const [saving, setSaving]  = useState(false);
  const [error, setError]    = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('O título é obrigatório.'); return; }
    try {
      setSaving(true);
      setError('');
      await onSubmit({ title: title.trim(), description: desc.trim() });
    } catch (err) {
      setError('Erro ao salvar. Tente novamente.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.modal} animate-scale-in`} role="dialog"
        aria-modal="true"
        aria-label={isEdit ? 'Editar tarefa' : 'Nova tarefa'}>

        <div className={styles.header}>
          <h2 className={styles.modalTitle}>
            {isEdit ? '✏️ Editar Tarefa' : '✨ Nova Tarefa'}
          </h2>
          <button id="modal-close" className={styles.closeBtn} onClick={onClose} aria-label="Fechar">×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="todo-title" className={styles.label}>Título *</label>
            <input
              id="todo-title"
              className={styles.input}
              type="text"
              placeholder="O que precisa ser feito?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              maxLength={150}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="todo-desc" className={styles.label}>
              Descrição <span className={styles.optional}>(opcional)</span>
            </label>
            <textarea
              id="todo-desc"
              className={styles.textarea}
              placeholder="Mais detalhes…"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={3}
              maxLength={500}
            />
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button id="modal-submit" type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Criar tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
