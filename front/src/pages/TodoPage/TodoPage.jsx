import { useState, useEffect, useCallback } from 'react';
import todoService from '../../api/todoService';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import ConfirmModal from './ConfirmModal';
import styles from './TodoPage.module.css';

const FILTERS = [
  { key: 'all',       label: 'Todas' },
  { key: 'pending',   label: 'Pendentes' },
  { key: 'completed', label: 'Concluídas' },
];

/**
 * TodoPage — Main page with full CRUD + filter UI
 */
export default function TodoPage() {
  const [todos, setTodos]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [filter, setFilter]             = useState('all');
  const [showForm, setShowForm]         = useState(false);
  const [editingTodo, setEditingTodo]   = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // todo to delete

  /* ---- Fetch todos ---- */
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      setError('Não foi possível carregar os todos. Verifique se o servidor está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  /* ---- CRUD handlers ---- */
  const handleCreate = async (formData) => {
    const created = await todoService.create(formData);
    setTodos(prev => [created, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = async (id, formData) => {
    const updated = await todoService.update(id, formData);
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
    setEditingTodo(null);
  };

  const handleToggle = async (todo) => {
    const updated = await todoService.toggleComplete(todo.id, todo.completed);
    setTodos(prev => prev.map(t => t.id === todo.id ? updated : t));
  };

  const handleDeleteConfirmed = async () => {
    if (!confirmDelete) return;
    await todoService.remove(confirmDelete.id);
    setTodos(prev => prev.filter(t => t.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  /* ---- Filtered list ---- */
  const filtered = todos.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending')   return !t.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const progressPct = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className={styles.page}>
      {/* ---- Hero header ---- */}
      <section className={styles.hero}>
        <div>
          <h1 className={styles.title}>Minha Lista</h1>
          <p className={styles.subtitle}>
            {completedCount} de {todos.length} tarefas concluídas
          </p>
        </div>
        <button
          id="btn-add-todo"
          className={styles.addBtn}
          onClick={() => { setEditingTodo(null); setShowForm(true); }}
        >
          <span>+</span> Nova Tarefa
        </button>
      </section>

      {/* ---- Progress bar ---- */}
      {todos.length > 0 && (
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className={styles.progressLabel}>{progressPct}%</span>
        </div>
      )}

      {/* ---- Filter tabs ---- */}
      <div className={styles.filters} role="tablist">
        {FILTERS.map(f => (
          <button
            key={f.key}
            id={`filter-${f.key}`}
            role="tab"
            aria-selected={filter === f.key}
            className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ---- Content ---- */}
      {loading && (
        <div className={styles.feedback}>
          <div className={styles.spinner} />
          <p>Carregando tarefas…</p>
        </div>
      )}

      {error && !loading && (
        <div className={styles.errorBox}>
          <span>⚠</span> {error}
          <button onClick={fetchTodos} className={styles.retryBtn}>Tentar novamente</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            {filter === 'completed' ? '🎉' : filter === 'pending' ? '☕' : '📋'}
          </div>
          <p className={styles.emptyTitle}>
            {filter === 'completed'
              ? 'Nenhuma tarefa concluída ainda'
              : filter === 'pending'
              ? 'Nenhuma tarefa pendente!'
              : 'Nenhuma tarefa encontrada'}
          </p>
          {filter === 'all' && (
            <button
              className={styles.addBtn}
              onClick={() => setShowForm(true)}
            >
              Criar primeira tarefa
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul className={styles.list}>
          {filtered.map((todo, i) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              style={{ animationDelay: `${i * 40}ms` }}
              onToggle={() => handleToggle(todo)}
              onEdit={() => { setEditingTodo(todo); setShowForm(true); }}
              onDelete={() => setConfirmDelete(todo)}
            />
          ))}
        </ul>
      )}

      {/* ---- Add / Edit Modal ---- */}
      {showForm && (
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo
            ? (data) => handleUpdate(editingTodo.id, data)
            : handleCreate}
          onClose={() => { setShowForm(false); setEditingTodo(null); }}
        />
      )}

      {/* ---- Delete Confirm Modal ---- */}
      {confirmDelete && (
        <ConfirmModal
          message={`Deletar "${confirmDelete.title}"?`}
          onConfirm={handleDeleteConfirmed}
          onClose={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
