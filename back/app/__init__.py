from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes.task_routes import router as task_router

# Carrega as variaveis do arquivo .env para dentro do ambiente da aplicacao.
load_dotenv()


# Define uma rotina de ciclo de vida da aplicacao FastAPI.
@asynccontextmanager
async def lifespan(_: FastAPI):
    # Cria as tabelas no banco quando a aplicacao iniciar, caso ainda nao existam.
    Base.metadata.create_all(bind=engine)
    # Entrega o controle para a aplicacao continuar a inicializacao normal.
    yield


# Funcao fabrica responsavel por montar e devolver a aplicacao FastAPI pronta.
def create_app() -> FastAPI:
    # Instancia a API com um titulo e com a rotina de startup/shutdown configurada.
    app = FastAPI(
        title="Todo API",
        description="API para gerenciamento de tarefas com arquitetura em camadas.",
        version="1.0.0",
        lifespan=lifespan,
        contact={
            "name": "Equipe da disciplina",
        },
    )

    # Lê as origens permitidas para o frontend acessar a API via navegador.
    allowed_origins = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    )

    # Adiciona o middleware de CORS para liberar chamadas do frontend.
    app.add_middleware(
        CORSMiddleware,
        # Transforma a string separada por virgula em uma lista de URLs validas.
        allow_origins=[origin.strip() for origin in allowed_origins.split(",") if origin.strip()],
        # Permite envio de cookies e credenciais caso seja necessario.
        allow_credentials=True,
        # Libera todos os metodos HTTP como GET, POST, PUT e DELETE.
        allow_methods=["*"],
        # Libera todos os cabecalhos HTTP recebidos nas requisicoes.
        allow_headers=["*"],
    )

    # Registra as rotas de task dentro da aplicacao principal.
    app.include_router(task_router)

    # Retorna a aplicacao configurada para ser executada pelo servidor.
    return app
