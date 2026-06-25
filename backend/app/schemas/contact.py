from datetime import datetime

from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    read: bool
    created_at: datetime

    model_config = {"from_attributes": True}
