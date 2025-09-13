from pydantic import BaseModel

class ClassifyResponse(BaseModel):
    category: str
    reply: str
