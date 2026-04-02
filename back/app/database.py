import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Carrega as variaveis de ambiente para acessar a URL do banco.
load_dotenv()

# Busca a URL do banco no .env e usa SQLite local como fallback para desenvolvimento.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo.db")

# Ajusta um parametro extra apenas quando o banco for SQLite.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

# Cria o engine, objeto central que gerencia a conexao com o banco de dados.
engine = create_engine(DATABASE_URL, future=True, connect_args=connect_args)

# Cria uma fabrica de sessoes que sera usada nas requisicoes da API.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cria a classe base que todos os modelos SQLAlchemy vao herdar.
Base = declarative_base()
