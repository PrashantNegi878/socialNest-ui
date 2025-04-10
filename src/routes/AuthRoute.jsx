import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "firebase/compat/auth";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import GoogleAuth from "../components/GoogleAuth";
import Connections from "../components/Connections"; // Import Connections component
import Requests from "../components/Requests"; // Import Requests component

function AuthRoute() {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Feed"); // State to track active tab
  const dispatch = useDispatch();

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Feed":
        return <Feed />;
      case "Connections":
        return <Connections />;
      case "Requests":
        return <Requests />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      {loading && <Spinner text={"Login / Signup in process"} />}
      {user ? (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-50 items-center">
 <div className="flex space-x-4 my-4  backdrop-blur-2xl p-2 rounded-lg">
  <button
    className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center transition-all ${
      activeTab === "Feed" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-600 text-white hover:bg-gray-700"
    }`}
    onClick={() => setActiveTab("Feed")}
  >
    Feed
  </button>
  <button
    className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center transition-all ${
      activeTab === "Connections" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-600 text-white hover:bg-gray-700"
    }`}
    onClick={() => setActiveTab("Connections")}
  >
    Connections
  </button>
  <button
    className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md flex items-center transition-all ${
      activeTab === "Requests" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-600 text-white hover:bg-gray-700"
    }`}
    onClick={() => setActiveTab("Requests")}
  >
    Requests
  </button>
</div>


          <div className="w-full flex justify-center">
            {renderActiveComponent()}
          </div>
        </div>
      ) : (
        <GoogleAuth setLoading={setLoading} />
      )}
    </>
  );
}

export default AuthRoute;
