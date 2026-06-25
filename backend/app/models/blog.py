from sqlalchemy import Column, DateTime, Integer, String, Text, func

from app.core.database import Base


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    excerpt = Column(Text, default="")
    content = Column(Text, nullable=False)
    cover_image = Column(String(500), default="")
    tags = Column(String(500), default="")
    published = Column(Integer, default=0)
    read_time = Column(Integer, default=5)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
