# Reexporta o router principal do modulo de rotas.
from app.routes.todo_routes import router

# Controla os simbolos publicos expostos pelo pacote routes.
__all__ = ["router"]
