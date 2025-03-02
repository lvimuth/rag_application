import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-blue-400 h-3 w-3"></div>
        <div className="rounded-full bg-blue-400 h-3 w-3"></div>
        <div className="rounded-full bg-blue-400 h-3 w-3"></div>
      </div>
    </div>
  );
};

export default Loading;
