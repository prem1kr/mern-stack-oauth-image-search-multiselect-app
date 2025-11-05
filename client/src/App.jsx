import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import History from "./pages/History.jsx";
import Navbar from "./components/Navbar.jsx";
import { AuthContext } from "./context/AuthProvider.jsx";

function Protected({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="p-6">Checking authentication...</div>;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/search"
          element={
            <Protected>
              <Search />
            </Protected>
          }
        />
        <Route
          path="/history"
          element={
            <Protected>
              <History />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
