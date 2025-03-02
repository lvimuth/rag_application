import React, { useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { askQuestion } from "../services/api";

const QuestionForm = ({ onAnswerReceived, isDocumentUploaded }) => {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    if (!isDocumentUploaded) {
      setError("Please upload a document first");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await askQuestion(question);
      onAnswerReceived({
        question: question,
        answer: response.data.answer,
      });
      setQuestion("");
    } catch (error) {
      setError(error.response?.data?.detail || "Error retrieving answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Ask a Question
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question about the document..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            disabled={!isDocumentUploaded || isSubmitting}
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!isDocumentUploaded || isSubmitting || !question.trim()}
          className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center ${
            !isDocumentUploaded || isSubmitting || !question.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } transition-colors`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Submit Question
            </>
          )}
        </button>

        {!isDocumentUploaded && (
          <p className="mt-2 text-sm text-gray-500 text-center">
            Upload a document first to ask questions
          </p>
        )}
      </form>
    </div>
  );
};

export default QuestionForm;
