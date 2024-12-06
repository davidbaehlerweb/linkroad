import React, { useEffect, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import { MapPinIcon, UserIcon } from "@heroicons/react/24/outline";
import fond from "../assets/background.png";
import etape from "../assets/etape.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublierTrajet = () => {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    seats: 1,
    date: "",
    time: "",
    price: "",
    comments: "",
  });

  

  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Vérification de connexion
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal
  const navigate = useNavigate(); // Pour la navigation
  const [citySuggestions, setCitySuggestions] = useState([]); // Suggestions de villes
  const [selectedField, setSelectedField] = useState("");
  // Vérification si l'utilisateur est connecté
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
      setLoading(false);
    };

    checkAuth();
  }, []);


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === "departure" || name === "destination") {
      setSelectedField(name);
      if (value) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/swiss-cities?search=${value}`
          );
          setCitySuggestions(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des villes :", error.response || error.message);
          setCitySuggestions([]); // Vide les suggestions en cas d'erreur
        }
      } else {
        setCitySuggestions([]);
      }
    }
  };
  
  


  const handleSelectCity = (city) => {
    setFormData({ ...formData, [selectedField]: city.name });
    setCitySuggestions([]); // Effacer les suggestions après sélection
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Vous devez être connecté pour publier un trajet.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/trips", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("Erreur lors de la publication :", error);
      alert("Une erreur est survenue lors de la publication.");
    }
  };
  

  if (loading) {
    return <div>Chargement...</div>; // Affichage d'un état de chargement
  }

  return (
    <div className="relative bg-blue-50 min-h-screen flex flex-col">
      {/* Navbar fixe */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Trajet publié avec succès !</h2>
            <p className="text-gray-700 mb-4">
              Vous serez redirigé vers la page d'accueil dans quelques instants...
            </p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              onClick={() => navigate("/")}
            >
              Retourner à l'accueil
            </button>
          </div>
        </div>
      )}

      {/* Section principale avec fond */}
      <div
        className="relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${fond})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-center px-6">
          <div className="bg-purple-900/80 p-4 rounded-lg shadow-xl w-full max-w-xs z-10 border-4 border-white backdrop-blur-md mt-8">
            <h1 className="text-2xl font-bold text-white mb-4 text-center">
              {step === 1 ? "Informations principales" : "Détails du trajet"}
            </h1>
            <form className="space-y-4">
              {step === 1 && (
                <>
                  <div className="relative">
                    <label
                      htmlFor="departure"
                      className="block text-base font-semibold text-white mb-1"
                    >
                      Lieu de départ
                    </label>
                    <input
                      type="text"
                      id="departure"
                      name="departure"
                      placeholder="Genève"
                      value={formData.departure}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-white rounded-md focus:ring-purple-300 focus:border-purple-300 bg-purple-800 text-white"
                      required
                    />
                    {/* Suggestions pour le champ "departure" */}
                    {selectedField === "departure" && citySuggestions.length > 0 && (
                      <ul className="absolute bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50 w-full">
                        {citySuggestions.map((city, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectCity(city)}
                          >
                            {city.name}, {city.canton}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="destination"
                      className="block text-base font-semibold text-white mb-1"
                    >
                      Destination
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      placeholder="Zurich"
                      value={formData.destination}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-white rounded-md focus:ring-purple-300 focus:border-purple-300 bg-purple-800 text-white"
                      required
                    />
                    {/* Suggestions pour le champ "destination" */}
                    {selectedField === "destination" && citySuggestions.length > 0 && (
                      <ul className="absolute bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50 w-full">
                        {citySuggestions.map((city, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectCity(city)}
                          >
                            {city.name}, {city.canton}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="seats"
                      className="block text-base font-semibold text-white mb-1"
                    >
                      Nombre de passagers
                    </label>
                    <input
                      type="number"
                      id="seats"
                      name="seats"
                      min="1"
                      max="8"
                      value={formData.seats}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-white rounded-md focus:ring-purple-300 focus:border-purple-300 bg-purple-800 text-white"
                      required
                    />
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="w-full py-2 bg-orange-600 text-white text-lg font-bold rounded-md hover:bg-orange-700 transition"
                  >
                    Suivant
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="relative">
                    <label
                      htmlFor="date"
                      className="block text-base font-semibold text-white mb-1"
                    >
                      Date de départ
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-white rounded-md focus:ring-purple-300 focus:border-purple-300 bg-purple-800 text-white"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="time"
                      className="block text-base font-semibold text-white mb-1"
                    >
                      Heure de départ
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-white rounded-md focus:ring-purple-300 focus:border-purple-300 bg-purple-800 text-white"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="price"
                      className="block text-base font-semibold text-white mb-1"
                    >
                      Prix par passager (en CHF)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-white rounded-md focus:ring-purple-300 focus:border-purple-300 bg-purple-800 text-white"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="comments"
                      className="block text-base font-semibold text-white mb-1"
                    >
                      Commentaires (facultatif)
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-white rounded-md focus:ring-purple-300 focus:border-purple-300 bg-purple-800 text-white"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={handlePreviousStep}
                      className="w-1/2 py-2 bg-gray-600 text-white text-lg font-bold rounded-md hover:bg-gray-700 transition mr-2"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="w-1/2 py-2 bg-green-600 text-white text-lg font-bold rounded-md hover:bg-green-700 transition"
                    >
                      Publier
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>





      {/* Section secondaire */}
      <div className="bg-purple-600 text-white py-12">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-around items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold">Rejoignez 21 millions</h3>
              <p className="text-orange-400">de conducteurs LinkRoad</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Plus de 100 millions</h3>
              <p className="text-orange-400">de membres LinkRoad à travers le monde</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Plus de 40 millions</h3>
              <p className="text-orange-400">de trajets partagés par an</p>
            </div>
          </div>
          <div className="relative bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-xl mx-auto">
            <p className="italic">
              "5 ans d’utilisation de LinkRoad, des dizaines de trajets, autant
              de rencontres et d’échanges, pas une seule déception. MERCI !!"
            </p>
            <span className="block text-right font-bold mt-4 text-purple-600">- Simon</span>
          </div>
        </div>
      </div>

      {/* Section étape */}
      <div className="bg-orange-100 text-gray-800 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-purple-600 mb-12">
            Publiez votre trajet en quelques minutes seulement
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
              <img
                src={etape}
                alt="Publiez votre trajet"
                className="rounded-lg shadow-md w-full max-w-sm"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Créez votre compte sur LinkRoad</h3>
                  <p>Ajoutez votre photo, quelques lignes sur vous et votre numéro de téléphone.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Publiez votre trajet</h3>
                  <p>Indiquez votre lieu de départ et d’arrivée pour augmenter vos chances d’avoir des passagers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Acceptez vos demandes de réservation</h3>
                  <p>Découvrez les profils de vos passagers et économisez sur vos frais de voyage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section navigation */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Colonne 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-600">Comment voyager avec LinkRoad</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Trajets populaires en covoiturage</li>
                <li>Destinations populaires en covoiturage</li>
                <li>Voyager en covoiturage en Suisse</li>
                <li>Partagez vos trajets pour économiser</li>
                <li>Voyagez en toute sécurité</li>
                <li>Faites confiance à la communauté LinkRoad</li>
              </ul>
            </div>
            {/* Colonne 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-600">Trajets populaires en Suisse</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Genève → Lausanne</li>
                <li>Zurich → Berne</li>
                <li>Fribourg → Neuchâtel</li>
                <li>Lausanne → Sion</li>
                <li>Bâle → Zurich</li>
                <li>Lucerne → Lugano</li>
              </ul>
            </div>
            {/* Colonne 3 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-600">En savoir plus</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Covoiturer depuis une gare</li>
                <li>Covoiturage pour le quotidien</li>
                <li>Assurance et covoiturage</li>
                <li>Comment ça marche</li>
                <li>Qui sommes-nous ?</li>
                <li>Centre d’aide</li>
              </ul>
            </div>
          </div>
        </div>
      </div>






    </div>
  );
};

export default PublierTrajet;
