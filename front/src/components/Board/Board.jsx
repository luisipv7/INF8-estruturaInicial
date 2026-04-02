import { useState, useEffect } from 'react';
import Column from './Column';
import TaskForm from './TaskForm';
import taskService from '../../api/taskService';
import styles from './Board.module.css';

const COLUMNS = [
  { status: 'TODO', title: 'To Do' },
  { status: 'DOING', title: 'Doing' },
  { status: 'DONE', title: 'Done' }
];

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTask = (task = null) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleSubmitTask = async (formData) => {
    if (editingTask) {
      const updated = await taskService.update(editingTask.id, formData);
      setTasks(prev => prev.map(t => t.id === editingTask.id ? updated : t));
    } else {
      const created = await taskService.create(formData);
      setTasks(prev => [created, ...prev]);
    }
    handleCloseForm();
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;
    const updated = await taskService.update(taskId, { ...task, status: newStatus });
    setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
  };

  const handleDropTask = (taskId, newStatus) => {
    handleStatusChange(taskId, newStatus);
  };

  if (loading) {
    return <div className={styles.loading}>Loading tasks...</div>;
  }

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        {COLUMNS.map(col => (
          <Column
            key={col.status}
            status={col.status}
            title={col.title}
            tasks={tasks.filter(t => t.status === col.status)}
            onDropTask={handleDropTask}
            onOpenTask={handleOpenTask}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      
      <button 
        className={styles.fab} 
        onClick={() => handleOpenTask()}
        aria-label="Add Task"
      >
        +
      </button>

      {showForm && (
        <TaskForm 
          task={editingTask} 
          onSubmit={handleSubmitTask} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
}
