import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour la navigation
import axios from "axios";
import bannerImage from "../assets/banniere.png";

const Baniere = () => {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    time: "",
    passengers: 1,
  });

  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState({
    departure: false,
    destination: false,
  });

  const navigate = useNavigate(); // Utilisation de la navigation

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if ((name === "departure" || name === "destination") && value) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/swiss-cities?search=${value}`
        );
        setCitySuggestions(response.data);
        setShowSuggestions((prev) => ({ ...prev, [name]: true }));
      } catch (error) {
        console.error("Erreur lors de la récupération des villes :", error.response || error.message);
        setCitySuggestions([]);
        setShowSuggestions((prev) => ({ ...prev, [name]: false }));
      }
    } else {
      setCitySuggestions([]);
      setShowSuggestions((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSelectCity = (field, city) => {
    setFormData({ ...formData, [field]: city.name });
    setShowSuggestions((prev) => ({ ...prev, [field]: false }));
  };

  const handleSearch = () => {
    navigate("/results", { state: { ...formData } }); // Inclut tous les champs dans la navigation
  };
  

  return (
    <div
      className="relative bg-gray-800"
      style={{ height: "85vh" }}
    >
      <img
        src={bannerImage}
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Voyagez en toute sérénité
        </h1>
        <p className="text-md md:text-lg mb-6">
          Trouvez votre trajet idéal à un prix abordable.
        </p>
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-[95%] md:max-w-[80%] lg:max-w-[60%]">
          <div className="relative mb-4">
            <input
              type="text"
              name="departure"
              placeholder="Lieu de départ"
              value={formData.departure}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            {showSuggestions.departure && citySuggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50 w-full">
                {citySuggestions.map((city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 bg-gray-50 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectCity("departure", city)}
                  >
                    {city.name}, {city.canton}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            {showSuggestions.destination && citySuggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50 w-full">
                {citySuggestions.map((city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 bg-gray-50 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectCity("destination", city)}
                  >
                    {city.name}, {city.canton}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="text-gray-700 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="text-gray-700 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            <input
              type="number"
              name="passengers"
              min="1"
              max="10"
              placeholder="1"
              value={formData.passengers}
              onChange={handleChange}
              className="text-gray-700 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="mt-6 w-full bg-blue-500 text-white px-4 py-3 rounded-md font-semibold hover:bg-blue-600 transition-all"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};

export default Baniere;
