import React from "react";
import bannerImage from "../assets/banniere.png";

const Baniere = () => {
  return (
    <div className="relative bg-gray-800">
      {/* Image de fond */}
      <img
        src={bannerImage}
        alt="Banner"
        className="w-full h-64 md:h-96 object-cover"
      />
      {/* Contenu de la bannière */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Voyagez en toute sérénité
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Trouvez votre trajet idéal à un prix abordable.
        </p>
        {/* Barre de recherche */}
        <div className="bg-white shadow-md rounded-full flex items-center w-11/12 md:w-2/3 lg:w-1/2">
          {/* Champ "Génève" */}
          <input
            type="text"
            placeholder="Génève"
            className="flex-1 text-gray-700 px-3 py-2 outline-none rounded-l-full"
          />
          {/* Flèche */}
          <span className="px-2 text-gray-500">→</span>
          {/* Champ "Destination" */}
          <input
            type="text"
            placeholder="Destination"
            className="flex-1 text-gray-700 px-3 py-2 outline-none"
          />
          {/* Bouton Rechercher */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};

export default Baniere;
