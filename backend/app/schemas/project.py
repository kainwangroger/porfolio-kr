from datetime import datetime

from pydantic import BaseModel


class ProjectBase(BaseModel):
    title: str
    slug: str
    description: str
    content: str = ""
    tech_stack: str = ""
    image_url: str = ""
    github_url: str = ""
    demo_url: str = ""
    featured: int = 0
    year: int = 2025


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    description: str | None = None
    content: str | None = None
    tech_stack: str | None = None
    image_url: str | None = None
    github_url: str | None = None
    demo_url: str | None = None
    featured: int | None = None
    year: int | None = None


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = {"from_attributes": True}
