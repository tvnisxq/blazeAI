from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# We will create these router files next. 
# They handle the actual endpoint logic.
# from app.api import portfolio, extraction

def create_application() -> FastAPI:
    """
    Application factory pattern. 
    Keeps initialization clean and makes testing easier.
    """
    app = FastAPI(
        title="AI Portfolio Architect API",
        description="High-performance backend for NLP-driven portfolio generation.",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )

    # CORS Configuration: Crucial for your Next.js frontend to talk to this API.
    # Do not use allow_origins=["*"] in production.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"], 
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )

    # Router Inclusion
    # This is where we plug in the micro-services.
    # app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["Portfolio Generation"])
    # app.include_router(extraction.router, prefix="/api/v1/ml", tags=["ML Extraction"])

    return app

app = create_application()

# Global Exception Handler (Pro-level detail)
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "details": str(exc)},
    )

# Health Check Endpoint
# Used by Docker and CI/CD pipelines to verify the container is alive.
@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "operational", 
        "service": "ai-portfolio-architect",
        "version": "1.0.0"
    }