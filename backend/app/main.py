import fitz 

from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.models.classify_response import ClassifyResponse
from app.models.classify_request import ClassifyRequest
from app.services.gemini_service import classify_email_and_respond
from app.utils.file_extractor import extract_text_from_file
from app.utils.file_validator import validate_file_type

app = FastAPI(title="Email Classifier API", description="API para classificar e responder emails usando OpenAI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify-email-content/", response_model=ClassifyResponse)
async def classify_email_content(payload: ClassifyRequest):
    classification_result = classify_email_and_respond(payload.text)
    if classification_result.category == "Erro":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=classification_result.reply
        )
    return classification_result

@app.post("/classify-email-file-content/", response_model=ClassifyResponse)
async def classify_email_file_content(file: UploadFile = File(...)):
    detected_mime_type = await validate_file_type(file)
    email_text_content = await extract_text_from_file(file, detected_mime_type)
    classification_result = classify_email_and_respond(email_text_content)
    if classification_result.category == "Erro":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=classification_result.reply
        )
    return classification_result