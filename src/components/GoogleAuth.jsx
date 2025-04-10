import React, { useState } from "react";
import fetchWithToken from "../utils/auth";
import { setUser, clearUser } from "../store/slices/authSlice"; // Import Redux actions
import { API_URLS } from "../config/urls"; // Import URLs
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";

const GoogleAuth = ({ setLoading }) => {
  const dispatch = useDispatch(); // Get dispatch function from Redux store
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  async function handleAuth(action) {
    setLoading(true); // Ensure loading is set to true immediately
    try {
      const result = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      const user = result.user;
      const token = await user.getIdToken();
      const userObj = { userName: user.displayName, email: user.email, photoURL: user.photoURL, token };
      
      try {
        let response;
        if (action === "login") {
          response = await fetchWithToken(userObj, API_URLS.LOGIN); // Call fetchWithToken with user object and login URL
        } else {
          response = await fetchWithToken(userObj, API_URLS.SIGNUP); // Call fetchWithToken with user object and signup URL
        }
        
        if (response.status === 200) {
          dispatch(setUser(userObj)); // Dispatch action to set user in Redux store
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Error in login/signup"); // Set error message
          setTimeout(() => setErrorMessage(""), 3000); // Auto-close popup after 3 seconds
        }
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading is set to false after the process
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black backdrop-blur-2xl text-white p-6">
      {errorMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          {errorMessage}
        </div>
      )}
      <div className="bg-white/10 p-8 rounded-2xl shadow-lg w-96 text-center transform hover:scale-105 transition duration-300 backdrop-blur-lg border border-white/30">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome</h2>
        <p className="text-white mb-6">Sign up or log in using Google</p>
        <div className="space-y-4">
          <button onClick={() => handleAuth("signup")} className="flex items-center justify-center w-full py-3 px-5 border border-white/30 rounded-lg shadow-md text-white bg-white/10 hover:bg-white/20 transition font-medium backdrop-blur-lg">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google Logo"
              className="w-6 h-6 mr-3"
            />
            Sign Up with Google
          </button>
          <button onClick={() => handleAuth("login")} className="flex items-center justify-center w-full py-3 px-5 border border-white/30 rounded-lg shadow-md text-white bg-white/10 hover:bg-white/20 transition font-medium backdrop-blur-lg">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google Logo"
              className="w-6 h-6 mr-3"
            />
            Log In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
