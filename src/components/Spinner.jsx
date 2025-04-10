import React from "react";

const Spinner = ({ overlay = true, blur = false, text = "" }) => {
  return overlay ? (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 
        ${blur ? "backdrop-blur-md bg-gray-900/50" : "bg-gray-900/30"}`}
    >
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      {text && <p className="mt-2 text-white text-lg">{text}</p>}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <div className="w-12 h-12 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      {text && <p className="mt-2 text-gray-900 text-lg">{text}</p>}
    </div>
  );
};

export default Spinner;
