import logging
from typing import Optional
from fastapi import HTTPException, status
import asyncio
from concurrent.futures import ThreadPoolExecutor

logger = logging.getLogger(__name__)

# استيراد دوال الخدمة
try:
    from _core.services import token_service
except ImportError:
    logger.error("Failed to import token_service")
    token_service = None

executor = ThreadPoolExecutor(max_workers=5)

class TokenGenerator:
    """فئة لإدارة عمليات توليد التوكن"""
    
    @staticmethod
    async def generate_jwt(access_token: str) -> str:
        """
        توليد JWT من Access Token
        """
        if not token_service:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Token service not available"
            )
        
        try:
            loop = asyncio.get_event_loop()
            jwt_token = await loop.run_in_executor(
                executor,
                token_service.get_jwt,
                access_token
            )
            return jwt_token
        except Exception as e:
            logger.error(f"JWT generation error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to generate JWT: {str(e)}"
            )
    
    @staticmethod
    async def convert_eat_to_access(eat_token: str) -> tuple:
        """
        تحويل EAT Token إلى Access Token
        """
        if not token_service:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Token service not available"
            )
        
        try:
            loop = asyncio.get_event_loop()
            access_token, account_name = await loop.run_in_executor(
                executor,
                token_service.convert_eat_to_access,
                eat_token
            )
            return access_token, account_name
        except Exception as e:
            logger.error(f"EAT conversion error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to convert EAT: {str(e)}"
            )
    
    @staticmethod
    async def get_guest_token(uid: str, password: str) -> tuple:
        """
        استخراج Access Token من حساب الضيف
        """
        if not token_service:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Token service not available"
            )
        
        try:
            if not uid or not password:
                raise ValueError("UID and password are required")
            
            loop = asyncio.get_event_loop()
            access_token, open_id = await loop.run_in_executor(
                executor,
                token_service.get_guest_access_token,
                uid,
                password
            )
            return access_token, open_id
        except Exception as e:
            logger.error(f"Guest token error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to get guest token: {str(e)}"
            )
    
    @staticmethod
    async def update_bio(jwt_token: str, bio_text: str) -> bool:
        """
        تحديث البايو
        """
        if not token_service:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Token service not available"
            )
        
        try:
            if len(bio_text) >= 250:
                raise ValueError("Bio text is too long (max 250 characters)")
            
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(
                executor,
                token_service.update_bio,
                jwt_token,
                bio_text
            )
            return result
        except Exception as e:
            logger.error(f"Bio update error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to update bio: {str(e)}"
            )