from pathlib import Path

# ...existing code...

BASE_DIR = Path(__file__).resolve().parent.parent

# ...existing code...

# Ensure templates directory is included
TEMPLATES = [
    {
        # ...existing code...
        'DIRS': [BASE_DIR / "templates"],  # Add your templates directory here
        # ...existing code...
    },
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",  # Ensure this points to your static directory
]

# ...existing code...