import styles from './TaskCard.module.css';

export default function TaskCard({ task, onOpenTask, onStatusChange }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div
      className={styles.card}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onOpenTask(task)}
    >
      <h4 className={styles.title}>{task.title}</h4>
      <p className={styles.description}>{task.description}</p>
      {task.comments && (
        <div className={styles.comments}>
          <span className={styles.icon}>💬</span>
          <span>{task.comments.length > 20 ? task.comments.substring(0, 20) + '...' : task.comments}</span>
        </div>
      )}
      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className={styles.statusSelect}
        >
          <option value="TODO">To Do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option>
        </select>
      </div>
    </div>
  );
}
