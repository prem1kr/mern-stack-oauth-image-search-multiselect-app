import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { AuthContext } from "../context/AuthProvider.jsx";
import logo from '../../public/logo.png';

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      setUser(null);
      navigate("/");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur-lg shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / Title */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ImageSearch Logo" className="h-8 w-8 object-contain" />
            <span className="text-2xl font-semibold tracking-wide text-indigo-600">Img</span>
          </Link>

          {/* Hamburger Icon (Mobile) */}
          <button
            className="block md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-gray-700">
            <Link to="/home" className="hover:text-indigo-600 transition">Home</Link>
            <Link to="/history" className="hover:text-indigo-600 transition">History</Link>
            {user ? (
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center bg-gray-200 text-indigo-600 font-semibold rounded-full">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/"
                className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (60% width) & Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-[60vw] bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col space-y-4 h-full">
          {/* Close Button */}
          <button
            className="self-end text-white hover:text-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Drawer Menu Links */}
          <Link
            to="/home"
            className="hover:bg-indigo-600 rounded px-3 py-2 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/history"
            className="hover:bg-indigo-600 rounded px-3 py-2 transition"
            onClick={() => setMenuOpen(false)}
          >
            History
          </Link>

          <div className="border-t border-indigo-300 my-3"></div>

          {/* User Info & Logout */}
          {user ? (
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-3">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-9 h-9 rounded-full border border-white" />
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center bg-white text-indigo-700 font-semibold rounded-full">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className="text-sm font-medium">{user.name}</div>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-white text-indigo-600 py-2 rounded font-medium hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="mt-auto block w-full text-center bg-white text-indigo-600 py-2 rounded font-medium hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
