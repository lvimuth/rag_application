from PyPDF2 import PdfReader
from fastapi import UploadFile
from app.utils.text_processor import TextProcessor

class DocumentService:
    def __init__(self):
        self.text_processor = TextProcessor()

    async def process_document(self, file: UploadFile) -> list[str]:
        # Read the PDF file
        content = await file.read()
        
        # Save temporarily and read with PyPDF2
        with open("temp.pdf", "wb") as temp_file:
            temp_file.write(content)
        
        pdf_reader = PdfReader("temp.pdf")
        text = ""
        
        # Extract text from all pages
        for page in pdf_reader.pages:
            text += page.extract_text()

        # Chunk the text
        chunks = self.text_processor.chunk_text(text)
        return chunks 