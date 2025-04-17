import React from "react";

const Spinner = ({ overlay = true, blur = "mid", text = "" }) => {
  const blurClass = blur === "high" ? "backdrop-blur-2xl bg-gray-900/80" : blur === "mid" ? "backdrop-blur-[2px] bg-gray-900/10" : "bg-gray-900/30";

  return overlay ? (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 
        ${blurClass}`}
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
