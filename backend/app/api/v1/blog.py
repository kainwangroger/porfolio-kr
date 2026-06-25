from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.blog import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostResponse, BlogPostUpdate

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("", response_model=list[BlogPostResponse])
def list_posts(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return (
        db.query(BlogPost)
        .filter(BlogPost.published == 1)
        .order_by(BlogPost.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get("/all", response_model=list[BlogPostResponse])
def list_all_posts(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return (
        db.query(BlogPost)
        .order_by(BlogPost.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get("/{slug}", response_model=BlogPostResponse)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
def create_post(
    data: BlogPostCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    post = BlogPost(**data.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/{slug}", response_model=BlogPostResponse)
def update_post(
    slug: str,
    data: BlogPostUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    for key, val in data.model_dump(exclude_unset=True).items():
        setattr(post, key, val)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    slug: str,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
