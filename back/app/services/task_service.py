from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.task_model import Task
from app.repositories.task_repository import TaskRepository
from app.schemas.task_schema import TaskCreate, TaskUpdate

class TaskService:
    def __init__(self, db: Session):
        self.repository = TaskRepository(db)

    def list_tasks(self):
        return self.repository.get_all()

    def get_task(self, task_id: int):
        task = self.repository.get_by_id(task_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found."
            )
        return task

    def create_task(self, payload: TaskCreate):
        return self.repository.create(payload)

    def update_task(self, task_id: int, payload: TaskUpdate):
        task = self.get_task(task_id)
        return self.repository.update(task, payload)

    def delete_task(self, task_id: int):
        task = self.get_task(task_id)
        self.repository.delete(task)
