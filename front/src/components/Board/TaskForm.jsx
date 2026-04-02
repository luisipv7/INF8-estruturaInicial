import { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ task, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    comments: task?.comments || '',
    status: task?.status || 'TODO',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
          </div>
          <div className={styles.field}>
            <label>Comments</label>
            <textarea name="comments" value={formData.comments} onChange={handleChange} rows="2" />
          </div>
          <div className={styles.field}>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="TODO">To Do</option>
              <option value="DOING">Doing</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
