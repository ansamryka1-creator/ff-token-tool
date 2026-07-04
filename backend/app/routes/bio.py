from fastapi import APIRouter
from app.models import BioResponse

router = APIRouter()

BIO_LIBRARY = [
    {"id": 1, "text": "★ FALLEN ★ | FF Player | 💀", "category": "Gaming"},
    {"id": 2, "text": "🎮 Pro Gamer 🎮 | Always Online | 🔥", "category": "Gaming"},
    {"id": 3, "text": "✨ Aesthetic Bio ✨ | Dreamer | 💭", "category": "Aesthetic"},
    {"id": 4, "text": "👑 King of FF 👑 | Never Surrender | 🏆", "category": "Gaming"},
    {"id": 5, "text": "🌙 Night Owl 🌙 | Chill Vibes | ✨", "category": "Chill"},
    {"id": 6, "text": "⚡ Lightning Fast ⚡ | Speed Demon | 🚀", "category": "Gaming"},
    {"id": 7, "text": "🎭 Creative Soul 🎭 | Artist | 🎨", "category": "Creative"},
    {"id": 8, "text": "💎 Diamond Player 💎 | Legendary | 👑", "category": "Gaming"},
    {"id": 9, "text": "🌸 Flower Power 🌸 | Nature Lover | 🌺", "category": "Aesthetic"},
    {"id": 10, "text": "🔥 Fire Keeper 🔥 | Hot Shots | 💥", "category": "Gaming"},
    {"id": 11, "text": "🎵 Music Lover 🎵 | Vibe Check | 🎶", "category": "Creative"},
    {"id": 12, "text": "🌊 Ocean Breeze 🌊 | Chill Mode | 🏖️", "category": "Aesthetic"},
]

@router.get("/library", response_model=list[BioResponse], tags=["Bio"])
async def get_bio_library():
    """
    الحصول على مكتبة البايو (النماذج الجاهزة)
    
    تعيد قائمة بالبايوهات المقترحة من فئات مختلفة
    """
    return BIO_LIBRARY

@router.get("/library/{category}", response_model=list[BioResponse], tags=["Bio"])
async def get_bio_by_category(category: str):
    """
    الحصول على البايوهات حسب الفئة
    
    الفئات المتاحة:
    - Gaming
    - Aesthetic
    - Chill
    - Creative
    """
    filtered = [bio for bio in BIO_LIBRARY if bio.get("category", "").lower() == category.lower()]
    return filtered if filtered else BIO_LIBRARY