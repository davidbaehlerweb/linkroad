import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Ajout de useNavigate
import axios from "axios";
import Navbar from "../components/navigation/Navbar";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialisation de navigate
  const { departure, destination, date, time, passengers } = location.state; // Récupère les critères de recherche
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/trips`, {
          params: {
            departure,
            destination,
            date,
            time,
            passengers, // Utilise directement la variable passengers
          },
        });
        setTrips(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des trajets :",
          error.response || error.message
        );
      }
    };

    fetchTrips();
  }, [departure, destination, date, time, passengers]); // Ajout de passengers dans les dépendances

  const handleReserve = (trip) => {
    // Navigue vers la page de paiement en passant les données du trajet
    navigate("/payment", { state: { trip } });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-8 text-center">
            Résultats de recherche
          </h1>
          <p className="text-2xl text-gray-800 text-center mb-12">
            {departure && destination && (
              <>
                Trajets de{" "}
                <span className="text-purple-600 font-semibold">
                  {departure}
                </span>{" "}
                vers{" "}
                <span className="text-purple-600 font-semibold">
                  {destination}
                </span>{" "}
                le{" "}
                <span className="text-orange-600 font-semibold">{date}</span>{" "}
                à partir de{" "}
                <span className="text-orange-600 font-semibold">{time}</span>.
              </>
            )}
          </p>
          {trips.length > 0 ? (
            <div className="space-y-8">
              {trips.map((trip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg flex items-center p-8 hover:shadow-xl transition duration-300"
                >
                  {/* Avatar conducteur */}
                  <div className="flex-shrink-0 w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-2xl">
                    {trip.driver?.name?.charAt(0) || "D"}
                  </div>

                  {/* Informations sur le trajet */}
                  <div className="flex-grow ml-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {trip.departure} → {trip.destination}
                    </h2>
                    <p className="text-gray-800 text-lg">
                      <span className="font-semibold">Date :</span> {trip.date}{" "}
                      <span className="ml-6 font-semibold">Heure :</span>{" "}
                      {trip.time}
                    </p>
                    <p className="text-gray-800 text-lg mt-2">
                      <span className="font-semibold">Prix :</span>{" "}
                      <span className="text-orange-600">{trip.price} CHF</span>
                    </p>
                    {trip.comments && (
                      <p className="text-gray-600 italic text-base mt-4">
                        "{trip.comments}"
                      </p>
                    )}
                  </div>

                  {/* Bouton réserver */}
                  <div className="ml-8">
                    <button
                      onClick={() => handleReserve(trip)} // Passe le trip sélectionné
                      className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-orange-600 transition"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Aucun trajet trouvé
              </h2>
              <p className="text-gray-600 text-lg">
                Essayez de modifier vos critères de recherche ou revenez plus
                tard.
              </p>
              <button
                onClick={() => window.history.back()} // Retourne à la page précédente
                className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
              >
                Retourner
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
