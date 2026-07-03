from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TokenRequest(BaseModel):
    platform: str = Field(..., description="Platform name (google, facebook, vk, huawei, apple, twitter)")
    url: str = Field(..., description="Account URL or authentication URL")

class TokenResponse(BaseModel):
    accessToken: str
    jwt: str
    uid: str
    expiration: datetime

class BioRequest(BaseModel):
    content: str = Field(..., max_length=1000)

class BioResponse(BaseModel):
    id: int
    text: str
    category: str

class ErrorResponse(BaseModel):
    detail: str
    status_code: int = Field(default=400)