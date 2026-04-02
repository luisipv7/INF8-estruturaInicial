from pydantic import BaseModel, ConfigDict, Field
from app.models.task_model import TaskStatus

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Task title")
    description: str = Field(default="", description="Task description")
    comments: str = Field(default="", description="Task comments")
    status: TaskStatus = Field(default=TaskStatus.TODO, description="Task status")
    owner_id: int | None = Field(default=None, description="Owner ID")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None)
    comments: str | None = Field(default=None)
    status: TaskStatus | None = Field(default=None)
    owner_id: int | None = Field(default=None)

class TaskResponse(TaskBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
