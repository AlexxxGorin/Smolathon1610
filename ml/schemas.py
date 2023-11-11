from pydantic import BaseModel
from uuid import UUID
from typing import List, Dict


class Place(BaseModel):
    description: str
    tags: List


class PlaceVector(BaseModel):
    place_vector: List


class User(BaseModel):
    description: str
    tags: List


class UserPlace(BaseModel):
    user_place: str