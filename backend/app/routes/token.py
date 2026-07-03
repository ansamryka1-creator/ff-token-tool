from fastapi import APIRouter, HTTPException, status
from app.models import TokenRequest, TokenResponse
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

PLATFORMS = ["google", "facebook", "vk", "huawei", "apple", "twitter"]

@router.post("/token", response_model=TokenResponse)
async def generate_token(request: TokenRequest):
    """
    Generate JWT/EAT tokens
    
    - **platform**: Platform name (google, facebook, vk, huawei, apple, twitter)
    - **url**: Account URL or authentication URL
    """
    
    if request.platform.lower() not in PLATFORMS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid platform. Supported platforms: {', '.join(PLATFORMS)}"
        )
    
    if not request.url.startswith(("http://", "https://")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid URL format"
        )
    
    try:
        access_token = f"at_{request.platform}_{datetime.now().timestamp()}"
        jwt_token = f"jwt_{request.platform}_{datetime.now().timestamp()}"
        uid = f"FF_{hash(request.url) % 10000000000}"
        expiration = datetime.now() + timedelta(hours=24)
        
        logger.info(f"Token generated for platform: {request.platform}")
        
        return TokenResponse(
            accessToken=access_token,
            jwt=jwt_token,
            uid=uid,
            expiration=expiration
        )
    
    except Exception as e:
        logger.error(f"Error generating token: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate token"
        )