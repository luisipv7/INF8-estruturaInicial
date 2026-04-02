from collections.abc import Generator

from app.database import SessionLocal


# Dependency do FastAPI para abrir e fechar a sessao de banco por requisicao.
def get_db() -> Generator:
    # Cria uma nova sessao de acesso ao banco.
    db = SessionLocal()
    try:
        # Entrega a sessao para a rota ou camada que precisar dela.
        yield db
    finally:
        # Garante o fechamento da sessao ao fim da requisicao.
        db.close()
