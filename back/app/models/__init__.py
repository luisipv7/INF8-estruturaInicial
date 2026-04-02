# Reexporta o modelo Todo para facilitar importacoes a partir do pacote models.
from app.models.todo_model import Todo

# Define quais nomes ficam publicos quando alguem importar tudo do pacote.
__all__ = ["Todo"]
