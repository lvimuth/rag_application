import React from "react";
import { FaBookReader } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaBookReader className="text-white text-2xl" />
          <h1 className="text-white text-xl font-bold">DocumentQA</h1>
        </div>
        <div className="text-white text-sm">Powered by RAG Technology</div>
      </div>
    </nav>
  );
};

export default Navbar;
