# Back-end - FastAPI

## Requisitos
- Python 3.11+
- PostgreSQL rodando (via Docker Compose em `../db/`)

## Setup

```bash
# 1. Criar e ativar ambiente virtual
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Configurar variaveis de ambiente
cp .env.example .env

# 4. Subir o banco de dados
cd ../db
cp .env.example .env
docker compose up -d

# 5. Rodar o servidor FastAPI
cd ../back
uvicorn run:app --reload
```

## Estrutura de Pastas

```text
back/
|-- app/
|   |-- __init__.py      # Fabrica da aplicacao FastAPI
|   |-- models/          # Modelos SQLAlchemy (a implementar em aula)
|   `-- routes/          # Rotas/APIRouters (a implementar em aula)
|-- .env.example
|-- requirements.txt
`-- run.py               # Entry point do servidor
```
