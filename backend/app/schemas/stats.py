from pydantic import BaseModel


class StatResponse(BaseModel):
    key: str
    value: int


class StatsResponse(BaseModel):
    page_visits: int
    cv_downloads: int
    unread_messages: int
