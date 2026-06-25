from pydantic import BaseModel


class SkillBase(BaseModel):
    category: str
    name: str


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    category: str | None = None
    name: str | None = None


class SkillResponse(SkillBase):
    id: int

    model_config = {"from_attributes": True}
