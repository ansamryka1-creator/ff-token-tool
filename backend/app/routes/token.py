from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from app.services.handler import TokenGenerator
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# ==================== Models ====================

class TokenRequest(BaseModel):
    access_token: str = Field(..., min_length=1, description="Access Token من Free Fire")

class TokenResponse(BaseModel):
    accessToken: str
    jwt: str
    expiration: str

class EATRequest(BaseModel):
    eat_token: str = Field(..., min_length=1, description="EAT Token أو الرابط")

class EATResponse(BaseModel):
    access_token: str
    account_name: str

class GuestRequest(BaseModel):
    uid: str = Field(..., min_length=1, description="UID الحساب")
    password: str = Field(..., min_length=1, description="كلمة المرور")

class GuestResponse(BaseModel):
    access_token: str
    open_id: str

class BioUpdateRequest(BaseModel):
    jwt_token: str = Field(..., description="JWT Token")
    bio_text: str = Field(..., max_length=250, description="نص البايو")

class BioUpdateResponse(BaseModel):
    success: bool
    message: str

# ==================== Endpoints ====================

@router.post("/token", response_model=TokenResponse, tags=["Token"])
async def extract_jwt(request: TokenRequest):
    """
    استخراج JWT من Access Token
    
    - **access_token**: Access Token من Free Fire
    
    مثال:
    ```json
    {
        "access_token": "your_access_token_here"
    }
    ```
    """
    logger.info(f"Extracting JWT for token starting with: {request.access_token[:10]}...")
    
    jwt_token = await TokenGenerator.generate_jwt(request.access_token)
    expiration = (datetime.now() + timedelta(hours=24)).isoformat()
    
    return TokenResponse(
        accessToken=request.access_token,
        jwt=jwt_token,
        expiration=expiration
    )

@router.post("/eat-to-access", response_model=EATResponse, tags=["Token"])
async def convert_eat(request: EATRequest):
    """
    تحويل EAT Token إلى Access Token
    
    - **eat_token**: EAT Token أو رابط EAT
    
    مثال:
    ```json
    {
        "eat_token": "your_eat_token_here_or_url"
    }
    ```
    """
    logger.info(f"Converting EAT token: {request.eat_token[:20]}...")
    
    access_token, account_name = await TokenGenerator.convert_eat_to_access(request.eat_token)
    
    return EATResponse(
        access_token=access_token,
        account_name=account_name
    )

@router.post("/guest-token", response_model=GuestResponse, tags=["Token"])
async def get_guest_access(request: GuestRequest):
    """
    استخراج Access Token من حساب الضيف (Guest)
    
    - **uid**: UID الحساب
    - **password**: كلمة المرور
    
    مثال:
    ```json
    {
        "uid": "123456789",
        "password": "password123"
    }
    ```
    """
    logger.info(f"Getting guest token for UID: {request.uid}")
    
    access_token, open_id = await TokenGenerator.get_guest_token(request.uid, request.password)
    
    return GuestResponse(
        access_token=access_token,
        open_id=open_id
    )

@router.post("/update-bio", response_model=BioUpdateResponse, tags=["Bio"])
async def update_player_bio(request: BioUpdateRequest):
    """
    تحديث البايو (الصفحة الشخصية)
    
    - **jwt_token**: JWT Token
    - **bio_text**: نص البايو (أقل من 250 حرف)
    
    مثال:
    ```json
    {
        "jwt_token": "your_jwt_token_here",
        "bio_text": "My awesome Free Fire bio"
    }
    ```
    """
    logger.info(f"Updating bio with text: {request.bio_text}")
    
    success = await TokenGenerator.update_bio(request.jwt_token, request.bio_text)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update bio"
        )
    
    return BioUpdateResponse(
        success=True,
        message="Bio updated successfully"
    )