# Back-end — Flask API

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

# 2. Instalar dependências
pip install -r requirements.txt

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 4. Subir o banco de dados
cd ../db
cp .env.example .env
docker compose up -d

# 5. Rodar o servidor Flask
cd ../back
flask run
```

## Estrutura de Pastas

```
back/
├── app/
│   ├── __init__.py      # Fábrica da aplicação Flask
│   ├── models/          # Modelos SQLAlchemy (a implementar em aula)
│   └── routes/          # Blueprints de rotas (a implementar em aula)
├── .env.example
├── requirements.txt
└── run.py               # Entry point
```

## Rotas planejadas (a implementar em aula)

| Método | Rota            | Descrição               |
|--------|-----------------|-------------------------|
| GET    | /todos          | Listar todos os todos   |
| POST   | /todos          | Criar novo todo         |
| GET    | /todos/:id      | Buscar todo por ID      |
| PUT    | /todos/:id      | Atualizar todo          |
| DELETE | /todos/:id      | Deletar todo            |
