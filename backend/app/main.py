import structlog
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from sqlalchemy import text

from app.api.v1 import auth, blog, contact, events, projects, skills, stats
from app.core.config import settings
from app.core.database import Base, engine, SessionLocal
from app.core.rate_limit import limiter

# Structured logging
structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.StackInfoRenderer(),
        structlog.dev.ConsoleRenderer(),
    ],
    wrapper_class=structlog.make_filtering_bound_logger(30),
    context_class=dict,
    logger_factory=structlog.PrintLoggerFactory(),
    cache_logger_on_first_use=True,
)

log = structlog.get_logger()

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME, version=settings.VERSION)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router, prefix="/api/v1")
app.include_router(blog.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(skills.router, prefix="/api/v1")
app.include_router(stats.router, prefix="/api/v1")
app.include_router(events.router, prefix="/api/v1")


@app.get("/api/v1/health")
@limiter.exempt
def health(request: Request):
    """Health check endpoint avec vérification de la base de données."""
    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception as e:
        log.error("health_check_db_failed", error=str(e))
        db_status = "unhealthy"
    finally:
        db.close()

    status = "ok" if db_status == "healthy" else "degraded"
    return {
        "status": status,
        "version": settings.VERSION,
        "database": db_status,
    }
