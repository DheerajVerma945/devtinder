import React from "react";

function Loaders() {
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-40 flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce1"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce2"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce3"></div>
      </div>
    </div>
  );
}

export default Loaders;
