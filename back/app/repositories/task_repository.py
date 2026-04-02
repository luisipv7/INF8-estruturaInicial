from sqlalchemy.orm import Session
from app.models.task_model import Task
from app.schemas.task_schema import TaskCreate, TaskUpdate

class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Task).order_by(Task.id.desc()).all()

    def get_by_id(self, task_id: int):
        return self.db.query(Task).filter(Task.id == task_id).first()

    def create(self, payload: TaskCreate):
        new_task = Task(**payload.model_dump())
        self.db.add(new_task)
        self.db.commit()
        self.db.refresh(new_task)
        return new_task

    def update(self, db_task: Task, payload: TaskUpdate):
        update_data = payload.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def delete(self, db_task: Task):
        self.db.delete(db_task)
        self.db.commit()
