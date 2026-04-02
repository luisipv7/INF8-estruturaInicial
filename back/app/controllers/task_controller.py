from sqlalchemy.orm import Session
from app.schemas.task_schema import TaskCreate, TaskUpdate
from app.services.task_service import TaskService

class TaskController:
    def __init__(self, db: Session):
        self.service = TaskService(db)

    def list_tasks(self):
        return self.service.list_tasks()

    def get_task(self, task_id: int):
        return self.service.get_task(task_id)

    def create_task(self, payload: TaskCreate):
        return self.service.create_task(payload)

    def update_task(self, task_id: int, payload: TaskUpdate):
        return self.service.update_task(task_id, payload)

    def delete_task(self, task_id: int):
        return self.service.delete_task(task_id)
