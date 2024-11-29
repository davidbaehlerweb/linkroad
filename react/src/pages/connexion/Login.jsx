import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assurez-vous que le backend renvoie bien le cookie CSRF
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });

      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData,
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        setIsSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Une erreur s'est produite.";
      setErrors({ login: errorMessage });
      setIsFailure(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <h2 className="text-2xl font-bold text-center text-violet-500 mb-6">
          Connexion à LinkRoad
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition"
          >
            Se connecter
          </button>
        </form>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Connexion réussie !
            </h2>
            <p className="text-gray-600 mb-4">
              Vous êtes connecté avec succès. Redirection en cours...
            </p>
          </div>
        </div>
      )}

      {isFailure && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Échec de connexion !
            </h2>
            <p className="text-gray-600 mb-4">{errors.login}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
