from datetime import datetime

from pydantic import BaseModel


class EventBase(BaseModel):
    title: str
    slug: str
    organizer: str = ""
    location: str = ""
    period: str = ""
    role: str = ""
    description: str = ""
    #: Galerie, une URL par ligne.
    images: str = ""
    link_url: str = ""
    sort_order: int = 0


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    organizer: str | None = None
    location: str | None = None
    period: str | None = None
    role: str | None = None
    description: str | None = None
    images: str | None = None
    link_url: str | None = None
    sort_order: int | None = None


class EventResponse(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = {"from_attributes": True}
