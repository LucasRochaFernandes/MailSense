import fitz
from fastapi import UploadFile, HTTPException, status

async def extract_text_from_file(file: UploadFile, mime_type: str) -> str:
    email_text_content = ""
    try:
        if mime_type == "text/plain":
            full_content = await file.read()
            email_text_content = full_content.decode("utf-8", errors="replace")

        elif mime_type == "application/pdf":
            pdf_bytes = await file.read()
            with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
                email_text_content = "".join(page.get_text() for page in doc)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Não foi possível processar o conteúdo do arquivo: {e}"
        )

    if not email_text_content.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O arquivo enviado está vazio ou não contém texto extraível."
        )

    email_text_content = email_text_content.replace('\n', ' ')
    return email_text_content
