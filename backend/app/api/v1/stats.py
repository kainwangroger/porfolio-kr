import httpx
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.contact import ContactMessage
from app.models.stats import Stat
from app.schemas.stats import StatResponse, StatsResponse

router = APIRouter(prefix="/stats", tags=["stats"])


def _get_or_create_stat(db: Session, key: str) -> Stat:
    stat = db.query(Stat).filter(Stat.key == key).first()
    if not stat:
        stat = Stat(key=key, value=0)
        db.add(stat)
    return stat


@router.post("/page-visit", response_model=StatResponse)
def track_page_visit(db: Session = Depends(get_db)):
    stat = _get_or_create_stat(db, "page_visits")
    stat.value += 1
    db.commit()
    db.refresh(stat)
    return StatResponse(key=stat.key, value=stat.value)


@router.post("/cv-download", response_model=StatResponse)
def track_cv_download(db: Session = Depends(get_db)):
    stat = _get_or_create_stat(db, "cv_downloads")
    stat.value += 1
    db.commit()
    db.refresh(stat)
    return StatResponse(key=stat.key, value=stat.value)


@router.get("/all", response_model=StatsResponse)
def get_all_stats(
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    def _val(key: str) -> int:
        s = db.query(Stat).filter(Stat.key == key).first()
        return s.value if s else 0

    unread = db.query(ContactMessage).filter(ContactMessage.read == False).count()

    return StatsResponse(
        page_visits=_val("page_visits"),
        cv_downloads=_val("cv_downloads"),
        unread_messages=unread,
    )


@router.get("/github")
async def github_stats(username: str = "roger"):
    async with httpx.AsyncClient() as client:
        user_res = await client.get(f"https://api.github.com/users/{username}")
        repos_res = await client.get(
            f"https://api.github.com/users/{username}/repos?per_page=100&sort=updated"
        )
    if user_res.status_code != 200:
        return {"error": "User not found"}

    user_data = user_res.json()
    repos_data = repos_res.json()

    own_repos = [r for r in repos_data if not r.get("fork")]
    total_stars = sum(r.get("stargazers_count", 0) for r in own_repos)
    total_forks = sum(r.get("forks_count", 0) for r in own_repos)

    return {
        "username": user_data["login"],
        "avatar_url": user_data["avatar_url"],
        "public_repos": len(own_repos),
        "total_stars": total_stars,
        "total_forks": total_forks,
        "followers": user_data["followers"],
        "top_repos": sorted(
            own_repos,
            key=lambda r: r.get("stargazers_count", 0),
            reverse=True,
        )[:5],
    }
