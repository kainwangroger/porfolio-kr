from sqlalchemy import Column, DateTime, Integer, String, Text, func

from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=False)
    content = Column(Text, default="")
    tech_stack = Column(String(500), default="")
    image_url = Column(String(500), default="")
    github_url = Column(String(500), default="")
    demo_url = Column(String(500), default="")
    featured = Column(Integer, default=0)
    year = Column(Integer, default=2025)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
