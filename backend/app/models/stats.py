from sqlalchemy import Column, Integer, String

from app.core.database import Base


class Stat(Base):
    __tablename__ = "stats"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, nullable=False, index=True)
    value = Column(Integer, default=0)
