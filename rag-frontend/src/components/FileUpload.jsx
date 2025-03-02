import React, { useState } from "react";
import { FaCloudUploadAlt, FaCheck, FaExclamationCircle } from "react-icons/fa";
import { uploadDocument } from "../services/api";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".pdf")) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      // Reset status
      setUploadStatus(null);
      setErrorMessage("");
    } else {
      setFile(null);
      setFileName("");
      setUploadStatus("error");
      setErrorMessage("Please select a PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("error");
      setErrorMessage("Please select a file");
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      await uploadDocument(file);
      setUploadStatus("success");
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage(error.response?.data?.detail || "Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Upload Document
      </h2>

      <div className="mb-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <FaCloudUploadAlt className="text-4xl text-blue-500 mb-2" />
            <p className="text-gray-700 mb-2">Drag & drop or click to upload</p>
            <p className="text-gray-500 text-sm">
              Only PDF files are supported
            </p>
          </label>
        </div>
      </div>

      {fileName && (
        <div className="flex items-center mb-4 p-2 bg-gray-50 rounded">
          <span className="flex-grow truncate text-sm">{fileName}</span>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="flex items-center mb-4 p-2 bg-green-50 text-green-700 rounded">
          <FaCheck className="mr-2" />
          <span>Document uploaded successfully!</span>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="flex items-center mb-4 p-2 bg-red-50 text-red-700 rounded">
          <FaExclamationCircle className="mr-2" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`w-full py-2 px-4 rounded-md font-medium ${
          !file || isUploading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        } transition-colors`}
      >
        {isUploading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );
};

export default FileUpload;
