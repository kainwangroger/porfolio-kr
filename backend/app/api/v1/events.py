from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventResponse, EventUpdate

router = APIRouter(prefix="/events", tags=["events"])


@router.get("", response_model=list[EventResponse])
def list_events(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return (
        db.query(Event)
        .order_by(Event.sort_order.desc(), Event.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get("/{slug}", response_model=EventResponse)
def get_event(slug: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.slug == slug).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    data: EventCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    if db.query(Event).filter(Event.slug == data.slug).first():
        raise HTTPException(status_code=409, detail="Slug already used")
    event = Event(**data.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.put("/{slug}", response_model=EventResponse)
def update_event(
    slug: str,
    data: EventUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    event = db.query(Event).filter(Event.slug == slug).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    for key, val in data.model_dump(exclude_unset=True).items():
        setattr(event, key, val)
    db.commit()
    db.refresh(event)
    return event


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    slug: str,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    event = db.query(Event).filter(Event.slug == slug).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()
