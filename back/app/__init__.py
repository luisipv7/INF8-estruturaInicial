from fastapi import FastAPI


def create_app() -> FastAPI:
    app = FastAPI(title="Todo API")
    return app
