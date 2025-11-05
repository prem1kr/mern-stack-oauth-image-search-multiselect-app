import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";

export default function Login() {
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white rounded shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Login to continue</h1>
        <p className="text-sm text-gray-600 mb-6">Choose one of the OAuth providers below</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`${BACKEND}/api/auth/google`}
            className="px-4 py-2 rounded bg-red-500 text-white hover:opacity-90"
          >
            Login with Google
          </a>

          <a
            href={`${BACKEND}/api/auth/github`}
            className="px-4 py-2 rounded bg-gray-800 text-white hover:opacity-90"
          >
            Login with GitHub
          </a>

        
        </div>

        <p className="mt-4 text-xs text-gray-500">
          After successful OAuth login you will be redirected back. If you remain on this page, try refreshing.
        </p>
      </div>
    </div>
  );
}
