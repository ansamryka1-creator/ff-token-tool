from fastapi import APIRouter, HTTPException, status
from app.models import BioRequest, BioResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

BIO_LIBRARY = [
    {"id": 1, "text": "★ 𝐊𝐢𝐥𝐥𝐞𝐫 ★ | FF Player | 💀", "category": "Gaming"},
    {"id": 2, "text": "🎮 Pro Gamer 🎮 | Always Online | 🔥", "category": "Gaming"},
    {"id": 3, "text": "✨ Aesthetic Bio ✨ | Dreamer | 💫", "category": "Aesthetic"},
    {"id": 4, "text": "👑 King of FF 👑 | Never Surrender | 🏆", "category": "Gaming"},
    {"id": 5, "text": "🌙 Night Owl 🌙 | Chill Vibes | ✨", "category": "Chill"},
    {"id": 6, "text": "⚡ Lightning Fast ⚡ | Speed Demon | 🚀", "category": "Gaming"},
]

@router.post("/longbio")
async def process_bio(request: BioRequest):
    """
    Process bio content
    
    - **content**: Bio text content (max 1000 characters)
    """
    try:
        if not request.content.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Bio content cannot be empty"
            )
        
        logger.info(f"Bio processed: {len(request.content)} characters")
        
        return {
            "success": True,
            "message": "Bio processed successfully",
            "content": request.content,
            "length": len(request.content)
        }
    
    except Exception as e:
        logger.error(f"Error processing bio: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process bio"
        )

@router.get("/bios", response_model=list[BioResponse])
async def get_bio_library():
    """
    Get bio library
    
    Returns a list of pre-made bio templates
    """
    try:
        logger.info("Bio library retrieved")
        return BIO_LIBRARY
    
    except Exception as e:
        logger.error(f"Error retrieving bio library: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve bio library"
        )