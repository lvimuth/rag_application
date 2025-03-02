bash
conda create -n rag_env python=3.11
conda activate rag_env

# Core dependencies
pip install fastapi==0.104.1
pip install uvicorn==0.24.0
pip install python-multipart==0.0.6
pip install pydantic==2.5.2

# PDF processing
pip install PyPDF2==3.0.1

# ML/AI dependencies
pip install numpy==1.24.3
pip install torch>=2.0.0
pip install transformers>=4.30.0
pip install huggingface-hub==0.16.4
pip install sentence-transformers==2.2.2

# LLM dependencies
pip install langchain==0.0.350
pip install langchain-community>=0.0.1

3. Install Ollama from https://ollama.com

4. Pull the required LLM model: llama3.2:3b-instruct-fp16

## Running the Application

1. Start Ollama in a separate terminal:

ollama serve

2. Start the FastAPI application:

uvicorn app.main:app --reload

## Accessing the API

1. API Documentation (Swagger UI):
   - Open your browser and visit: `http://localhost:8000/docs`
   - This provides an interactive interface to test all API endpoints

2. Available Endpoints:
   - GET `/`: Root endpoint with API information
   - POST `/upload`: Upload PDF document
   - POST `/question`: Ask questions about the uploaded document

## Usage Example

1. Upload a PDF document using Swagger UI or curl:

curl -X 'POST' \
  'http://localhost:8000/upload' \
  -H 'accept: application/json' \
  -F 'file=@/path/to/your/document.pdf'

2. Ask questions about the document:

curl -X 'POST' \
  'http://localhost:8000/question' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": "Your question here?"
}'

## Important Notes

- Make sure Ollama is running before starting the application
- Only PDF files are supported for upload
- The application keeps embeddings in memory (they will be lost when the server restarts)






