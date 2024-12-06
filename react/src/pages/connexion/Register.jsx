import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailMessage, setEmailMessage] = useState(""); // Message pour l'email
  const [passwordMessage, setPasswordMessage] = useState(""); // Message pour les mots de passe
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Met à jour les données du formulaire
    setFormData({ ...formData, [name]: value });

    // Vérifie si les mots de passe correspondent en temps réel
    if (name === "password" || name === "confirmPassword") {
      const password = name === "password" ? value : formData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (password && confirmPassword) {
        if (password === confirmPassword) {
          setPasswordMessage("Les mots de passe correspondent.");
        } else {
          setPasswordMessage("Les mots de passe ne correspondent pas.");
        }
      } else {
        setPasswordMessage("");
      }
    }
  };

  // Vérification de l'email lorsque l'utilisateur quitte le champ
  const handleEmailBlur = async () => {
    if (formData.email) {
      try {
        const response = await axios.post("http://localhost:8000/api/check-email", {
          email: formData.email,
        });
        if (response.data.exists) {
          setEmailMessage("Cet email est déjà utilisé.");
        } else {
          setEmailMessage("Cet email est disponible.");
        }
      } catch (error) {
        setEmailMessage("Erreur lors de la vérification de l'email.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    try {
      await axios.post("http://localhost:8000/api/register", data);
      setErrors({});
      setIsSuccess(true); // Affiche le message de succès

      // Redirection après 3 secondes
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-violet-500 mb-6">
          Inscription à LinkRoad
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Entrez votre nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              required
            />
            {emailMessage && (
              <p
                className={`text-sm mt-1 ${
                  emailMessage.includes("disponible")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {emailMessage}
              </p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
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

          {/* Confirmation */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Confirmez votre mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              required
            />
            {passwordMessage && (
              <p
                className={`text-sm mt-1 ${
                  passwordMessage.includes("correspondent")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordMessage}
              </p>
            )}
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Déjà inscrit ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-violet-500 hover:underline cursor-pointer"
          >
            Connectez-vous
          </span>
        </p>
      </div>

      {/* Modal de succès */}
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Compte créé avec succès !
            </h2>
            <p className="text-gray-600 mb-4">
              Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.
            </p>
            <button
              className="bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition"
              onClick={() => navigate("/login")}
            >
              Aller à la page de connexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
