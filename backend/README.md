# MailSense Backend API

The backend API for MailSense - a FastAPI-based email classification service powered by Google's Gemini AI. This RESTful API provides intelligent email categorization and automated response generation for high-volume email processing.

## Overview

This FastAPI application serves as the core engine for the MailSense email classification system. It processes email content through text input or file uploads, leverages Google's Gemini AI for intelligent classification, and generates contextually appropriate responses.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs with Python
- **Google Gemini AI Integration**: Advanced AI-powered email classification and response generation
- **Multi-Format File Support**: PDF and TXT file processing with text extraction
- **RESTful API Design**: Clean, well-documented API endpoints
- **Automatic API Documentation**: Interactive Swagger UI and ReDoc documentation
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Robust Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **File Validation**: MIME type detection and file format validation
- **Environment Configuration**: Secure API key management through environment variables

## Technology Stack

- **Framework**: FastAPI
- **AI Service**: Google Generative AI (Gemini 2.5 Flash Lite)
- **File Processing**: PyMuPDF for PDF text extraction
- **Data Validation**: Pydantic models for request/response validation
- **Server**: Uvicorn ASGI server
- **Environment**: python-dotenv for configuration management
- **MIME Detection**: python-magic for file type validation

## Prerequisites

- Python 3.8 or higher
- Google Gemini API key
- pip (Python package installer)

## Installation & Setup

### Local Development

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment configuration:
```bash
cp .env.example .env
```

5. Configure your environment variables in `.env`:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

6. Start the development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

7. Access the API:
   - **API Server**: http://localhost:8000
   - **Interactive Documentation**: http://localhost:8000/docs
   - **Alternative Documentation**: http://localhost:8000/redoc

### Docker Deployment

Build and run with Docker:

```bash
# Build the Docker image
docker build -t mailsense-backend .

# Run the container
docker run -p 8000:8000 -e GOOGLE_API_KEY=your_api_key mailsense-backend
```

Or use Docker Compose from the project root:

```bash
docker-compose up backend
```

## Project Structure

```
backend/
├── app/
│   ├── models/                  # Pydantic data models
│   │   ├── classify_request.py  # Request model for text classification
│   │   └── classify_response.py # Response model for classification results
│   ├── services/                # Business logic and AI integration
│   │   └── gemini_service.py    # Google Gemini AI service integration
│   ├── utils/                   # Utility functions
│   │   ├── file_extractor.py    # Text extraction from files
│   │   └── file_validator.py    # File type validation
│   ├── env.py                   # Environment configuration
│   └── main.py                  # FastAPI application entry point
├── requirements.txt             # Python dependencies
├── Dockerfile                   # Docker container configuration
└── README.md                   # This documentation
```

## API Endpoints

### 1. Classify Email Content (Text)

**Endpoint:** `POST /classify-email-content/`

**Description:** Classifies email content provided as plain text.

**Request Body:**
```json
{
  "text": "Email content to be classified"
}
```

**Response:**
```json
{
  "category": "Produtivo|Improdutivo",
  "reply": "Generated response text"
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/classify-email-content/" \
  -H "Content-Type: application/json" \
  -d '{"text": "Preciso de ajuda com o sistema de pagamentos"}'
```

### 2. Classify Email Content (File Upload)

**Endpoint:** `POST /classify-email-file-content/`

**Description:** Classifies email content from uploaded files (PDF or TXT).

**Request:** Multipart form data with file upload

**Supported File Types:**
- PDF files (.pdf)
- Text files (.txt)

**Response:**
```json
{
  "category": "Produtivo|Improdutivo", 
  "reply": "Generated response text"
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/classify-email-file-content/" \
  -F "file=@email_example.pdf"
```

## Core Components

### Models

#### ClassifyRequest
Pydantic model for text classification requests:
```python
class ClassifyRequest(BaseModel):
    text: str
```

#### ClassifyResponse
Pydantic model for classification responses:
```python
class ClassifyResponse(BaseModel):
    category: str
    reply: str
```

### Services

#### GeminiService
Handles AI-powered classification using Google's Gemini model:
- Configures Gemini AI client
- Processes classification prompts
- Generates contextual responses
- Returns structured classification results

### Utilities

#### FileExtractor
Extracts text content from uploaded files:
- PDF text extraction using PyMuPDF
- Plain text file processing
- Error handling for corrupted files
- Content validation

#### FileValidator
Validates uploaded file types:
- MIME type detection
- Supported format verification
- File size and format checks

## Email Classification Logic

The system uses Google's Gemini AI to classify emails into two categories:

### Productive Emails
- **Definition**: Emails requiring action or response
- **Examples**: Service requests, system inquiries, case updates, technical support
- **Response**: Professional acknowledgment indicating the request will be processed

### Non-Productive Emails
- **Definition**: Emails not requiring immediate action
- **Examples**: Spam, generic thanks, automated notifications, congratulations
- **Response**: Brief, courteous acknowledgment

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_API_KEY` | Google Gemini API key for AI processing | Yes | None |

## Error Handling

The API implements comprehensive error handling:

### HTTP Status Codes

- **200 OK**: Successful classification
- **400 Bad Request**: Invalid input or empty file content
- **422 Unprocessable Entity**: File processing errors
- **500 Internal Server Error**: AI service errors or server issues

### Error Response Format

```json
{
  "detail": "Error description message"
}
```

## Development

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Quality

```bash
# Format code
black app/

# Lint code
flake8 app/

# Type checking
mypy app/
```

### Adding New Features

1. **New Endpoints**: Add routes in `main.py`
2. **Data Models**: Create Pydantic models in `models/`
3. **Business Logic**: Add services in `services/`
4. **Utilities**: Add helper functions in `utils/`

## Performance Considerations

- **File Size Limits**: Implement appropriate file size restrictions
- **Rate Limiting**: Consider implementing API rate limiting for production
- **Caching**: Cache AI responses for identical content
- **Async Processing**: Use async/await for I/O operations

## Security Considerations

- **API Key Security**: Store API keys in environment variables
- **Input Validation**: Validate all user inputs through Pydantic models
- **File Upload Security**: Validate file types and sizes
- **CORS Configuration**: Configure CORS appropriately for production

## Troubleshooting

### Common Issues

1. **API Key Errors**
   ```
   Error: Invalid API key
   Solution: Verify GOOGLE_API_KEY in .env file
   ```

2. **File Processing Errors**
   ```
   Error: Cannot extract text from file
   Solution: Ensure file is not corrupted and is a supported format
   ```

3. **Import Errors**
   ```
   Error: Module not found
   Solution: Ensure all dependencies are installed via requirements.txt
   ```

### Debug Commands

```bash
# Check API health
curl http://localhost:8000/docs

# Verbose server logs
uvicorn app.main:app --reload --log-level debug

# Test specific endpoint
curl -X POST http://localhost:8000/classify-email-content/ \
  -H "Content-Type: application/json" \
  -d '{"text": "test email content"}'
```

## Monitoring and Logging

For production deployment, consider:
- Structured logging with correlation IDs
- Application performance monitoring (APM)
- Health check endpoints
- Metrics collection for API usage

## Contributing

1. Follow PEP 8 Python style guidelines
2. Add type hints to all functions
3. Include docstrings for all public methods
4. Write unit tests for new features
5. Update API documentation
6. Test with various file formats and edge cases

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Google Generative AI Documentation](https://ai.google.dev/docs)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
- [Uvicorn Documentation](https://www.uvicorn.org/)