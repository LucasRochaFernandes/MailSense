
FROM python:slim

# Instala as bibliotecas de sistema necessárias (C++ para PyMuPDF, libmagic para python-magic)
RUN apt-get update && apt-get install -y libstdc++6 libmagic1 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade pip -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]