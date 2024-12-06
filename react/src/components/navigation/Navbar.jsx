import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch, FiPlus } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assume user is logged out by default
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for the logout modal
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    setShowLogoutModal(true); // Show the modal after logout
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-violet-500 text-2xl font-bold ml-2">
              Link<span className="text-orange-500">Road</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#" className="text-gray-600 hover:text-violet-500 transition font-medium">
            Covoiturage
          </a>
          <button className="flex items-center text-gray-600 hover:text-violet-500">
            <FiSearch className="w-5 h-5 mr-2" />
            <span>Rechercher</span>
          </button>
          <button  className="flex items-center text-gray-600 hover:text-violet-500">
            <FiPlus className="w-6 h-6" />
            <a href="/publier-trajet"><span className="ml-2">Publier un trajet</span></a>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden">
            <div className="flex flex-col space-y-4 px-4 py-2">
              <a href="#" className="text-gray-600 hover:text-violet-500 transition font-medium">
                Covoiturage
              </a>
              <button className="flex items-center text-gray-600 hover:text-violet-500">
                <FiSearch className="w-5 h-5 mr-2" />
                <span>Rechercher</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-violet-500">
                <FiPlus className="w-6 h-6" />
                <a href="/publier-trajet"><span className="ml-2">Publier un trajet</span></a>
              </button>
            </div>
          </div>
        )}

        {/* Profile Menu */}
        <div className="relative hidden md:flex items-center space-x-4">
          <button
            onClick={toggleUserMenu}
            className="flex items-center text-violet-500 focus:outline-none"
          >
            <FaUserCircle className="w-8 h-8" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-48 py-2">
              {isAuthenticated ? (
                <>
                  <a
                    href="/account"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-violet-500 transition"
                  >
                    Mon compte
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-violet-500 transition"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-violet-500 transition"
                  >
                    Connexion
                  </a>
                  <a
                    href="/register"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-violet-500 transition"
                  >
                    Inscription
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Déconnexion réussie</h2>
            <p className="text-gray-600 mb-6">Vous êtes maintenant déconnecté.</p>
            <button
              className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition"
              onClick={() => setShowLogoutModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
