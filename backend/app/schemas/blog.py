from datetime import datetime

from pydantic import BaseModel


class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str = ""
    content: str
    cover_image: str = ""
    tags: str = ""
    published: int = 0
    read_time: int = 5


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    excerpt: str | None = None
    content: str | None = None
    cover_image: str | None = None
    tags: str | None = None
    published: int | None = None
    read_time: int | None = None


class BlogPostResponse(BlogPostBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = {"from_attributes": True}
