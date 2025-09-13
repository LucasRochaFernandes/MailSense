from app.models.classify_response import ClassifyResponse
from app import env

import json
import google.generativeai as genai
from google.generativeai import types

genai.configure(api_key=env.GOOGLE_API_KEY)

def classify_email_and_respond(email_content: str) -> ClassifyResponse:
    model = genai.GenerativeModel('gemini-2.5-flash-lite') 

    prompt = f"""
    Você é um assistente de IA especialista em classificar emails para uma empresa financeira.
    Sua tarefa é analisar o conteúdo do email e retornar um objeto JSON com DUAS chaves:
    1. "category": Classifique o email como "Produtivo" ou "Improdutivo".
       - "Produtivo": Emails que exigem uma ação, como solicitações, dúvidas sobre sistemas, atualizações de casos.
       - "Improdutivo": Emails que não exigem ação, como spam, felicitações, agradecimentos genéricos.
    2. "reply": Crie uma resposta curta e profissional adequada à categoria.
       - Para emails "Produtivo", sugira uma resposta que indique que a solicitação foi recebida e será tratada.
       - Para emails "Improdutivo", sugira uma resposta curta e cordial de agradecimento.

    Analise o conteúdo do email abaixo.

    --- CONTEÚDO DO EMAIL ---
    {email_content}
    """

    try:
        response = model.generate_content(
            prompt,
            generation_config=types.GenerationConfig(
                response_mime_type="application/json",
                response_schema=ClassifyResponse
            )
        )
        classifyResponse = json.loads(response.text)
        return ClassifyResponse(**classifyResponse)
    except Exception as error:
        print(f"Erro ao chamar a API Gemini: {error}")
        return {
            "category": "Erro",
            "reply": "Não foi possível processar o email no momento. Tente novamente."
        }