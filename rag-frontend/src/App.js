import React, { useState } from "react";
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import QuestionForm from "./components/QuestionForm";
import Answer from "./components/Answer";

const App = () => {
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [answerData, setAnswerData] = useState(null);

  const handleUploadSuccess = () => {
    setIsDocumentUploaded(true);
  };

  const handleAnswerReceived = (data) => {
    setAnswerData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Document Q&A System
            </h1>
            <p className="text-gray-600 mb-6">
              Upload a PDF document and ask questions to get insights from your
              document using advanced RAG (Retrieval-Augmented Generation)
              technology.
            </p>

            <FileUpload onUploadSuccess={handleUploadSuccess} />

            <QuestionForm
              onAnswerReceived={handleAnswerReceived}
              isDocumentUploaded={isDocumentUploaded}
            />
          </div>

          <div>
            {answerData ? (
              <Answer data={answerData} />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="mb-2">Upload a document and ask a question</p>
                  <p className="text-sm">Your answers will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} DocumentQA - Powered by RAG
          Technology
        </div>
      </footer>
    </div>
  );
};

export default App;
