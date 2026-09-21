import structlog
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.rate_limit import limiter
from app.core.security import create_access_token, verify_password
from app.models.user import User
from app.api.deps import get_current_user
from app.schemas.auth import LoginRequest, MeResponse, TokenResponse

log = structlog.get_logger()

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
@limiter.limit("5/minute")
def login(request: Request, data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user or not verify_password(data.password, user.hashed_password):
        log.warning("login_failed", username=data.username)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    log.info("login_success", username=data.username)
    token = create_access_token({"sub": user.username})
    return TokenResponse(access_token=token)


@router.get("/me", response_model=MeResponse)
def me(payload: dict = Depends(get_current_user)):
    """Vérifie qu'un jeton est valide et renvoie l'identité associée.

    Sert notamment au frontend Next, qui n'a pas la clé de signature et doit
    donc s'en remettre à l'API pour autoriser une purge de cache.
    """
    return MeResponse(username=payload.get("sub", ""))
