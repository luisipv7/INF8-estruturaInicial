from typing import Annotated
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.controllers.task_controller import TaskController
from app.dependencies import get_db
from app.schemas.task_schema import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])
DbSession = Annotated[Session, Depends(get_db)]

@router.get("", response_model=list[TaskResponse])
def list_tasks(db: DbSession):
    return TaskController(db).list_tasks()

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: DbSession):
    return TaskController(db).get_task(task_id)

@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: DbSession):
    return TaskController(db).create_task(payload)

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, payload: TaskUpdate, db: DbSession):
    return TaskController(db).update_task(task_id, payload)

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: DbSession):
    TaskController(db).delete_task(task_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
