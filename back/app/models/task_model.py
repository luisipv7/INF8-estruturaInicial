import enum
from sqlalchemy import Integer, String, Text, Enum
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class TaskStatus(enum.Enum):
    TODO = "TODO"
    DOING = "DOING"
    DONE = "DONE"

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    comments: Mapped[str] = mapped_column(Text, nullable=False, default="")
    status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus), nullable=False, default=TaskStatus.TODO)
    owner_id: Mapped[int] = mapped_column(Integer, nullable=True, index=True)
