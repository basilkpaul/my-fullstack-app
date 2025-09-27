from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    items: List[Item] = []

    class Config:
        from_attributes = True