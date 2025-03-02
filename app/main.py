from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.services.document_service import DocumentService
from app.services.embedding_service import EmbeddingService
from app.services.llm_service import LLMService
from app.models.schemas import QuestionRequest, QuestionResponse

app = FastAPI(
    title="RAG Application API",
    description="API for document upload and question answering using RAG",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
document_service = DocumentService()
embedding_service = EmbeddingService()
llm_service = LLMService()

@app.get("/", 
         summary="Root endpoint",
         description="Returns basic API information")
async def root():
    return JSONResponse(
        content={
            "message": "RAG Application API is running",
            "documentation": "/docs",
            "endpoints": {
                "upload_document": "/upload",
                "ask_question": "/question"
            }
        }
    )

@app.post("/upload", 
         summary="Upload PDF Document",
         description="Upload a PDF document for processing and embedding")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        # Process the document
        text_chunks = await document_service.process_document(file)
        # Generate and store embeddings
        embedding_service.generate_embeddings(text_chunks)
        return {"message": "Document processed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/question", 
          response_model=QuestionResponse,
          summary="Ask Question",
          description="Ask a question about the uploaded document")
async def ask_question(request: QuestionRequest):
    try:
        # Get relevant context using embeddings
        context = embedding_service.get_relevant_context(request.question)
        # Generate answer using LLM
        answer = llm_service.generate_answer(request.question, context)
        return QuestionResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 