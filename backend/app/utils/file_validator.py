import magic
from fastapi import UploadFile, HTTPException, status
from typing import List

ALLOWED_MIME_TYPES: List[str] = ["application/pdf", "text/plain"]

async def validate_file_type(file: UploadFile) -> str:
    file_content_bytes = await file.read(2048)
    await file.seek(0)
    
    detected_mime_type = magic.from_buffer(file_content_bytes, mime=True)

    if detected_mime_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Tipo de arquivo não suportado. Por favor, envie um arquivo TXT ou PDF."
        )

    return detected_mime_type
