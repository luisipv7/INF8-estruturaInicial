import TaskCard from './TaskCard';
import styles from './Column.module.css';

export default function Column({ status, title, tasks, onDropTask, onOpenTask, onStatusChange }) {
  const handleDragOver = (e) => {
    e.preventDefault(); // necessary to allow dropping
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onDropTask(parseInt(taskId, 10), status);
    }
  };

  return (
    <div
      className={styles.column}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className={styles.header}>
        {title} <span className={styles.count}>{tasks.length}</span>
      </h3>
      <div className={styles.cardList}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onOpenTask={onOpenTask}
            onStatusChange={onStatusChange}
          />
        ))}
        {tasks.length === 0 && <p className={styles.empty}>Drop here</p>}
      </div>
    </div>
  );
}
