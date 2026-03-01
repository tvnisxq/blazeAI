from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.api import portfolio

settings = get_settings()


def create_application() -> FastAPI:
    """
    Application factory pattern.
    Keeps initialization clean and makes testing easier.
    """
    app = FastAPI(
        title=settings.APP_NAME,
        description="High-performance backend for NLP-driven portfolio generation.",
        version=settings.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS — allow the Next.js frontend to call this API
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )

    # Register route modules
    app.include_router(
        portfolio.router,
        prefix="/api/v1/portfolio",
        tags=["Portfolio Generation"],
    )

    return app


app = create_application()


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Catch-all handler so unhandled errors return clean JSON."""
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "details": str(exc)},
    )


@app.get("/health", tags=["System"])
async def health_check():
    """Used by Docker and CI/CD pipelines to verify the container is alive."""
    return {
        "status": "operational",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }