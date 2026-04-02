# Reexporta os schemas usados nas entradas e saidas da API.
from app.schemas.todo_schema import TodoCreate, TodoResponse, TodoUpdate

# Define os nomes publicos do pacote schemas.
__all__ = ["TodoCreate", "TodoResponse", "TodoUpdate"]
