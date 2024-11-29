import React from "react";
import discoveryImage from "../assets/discovery-image.jpg";
import securityImage from "../assets/security-image.jpg";
import cardImage1 from "../assets/card-image1.jpg";
import cardImage2 from "../assets/card-image2.jpg";
import cardImage3 from "../assets/card-image3.jpg";

const Accueil = () => {
  return (
    <div>
      {/* Section 1 : Découverte */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left px-6">
            <h2 className="text-4xl font-extrabold text-violet-500 mb-4">
              Explorez de nouvelles villes
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Découvrez de nouvelles aventures à des prix abordables. Que ce
              soit pour un voyage d'affaires ou des vacances en famille,
              trouvez des trajets flexibles et fiables adaptés à vos besoins.
            </p>
            <button className="bg-violet-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-violet-600">
              Découvrir nos offres
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={discoveryImage}
              alt="Explore cities"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section 2 : Sécurité et Confiance */}
      <section className="bg-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <img
              src={securityImage}
              alt="Safety and trust"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left px-6">
            <h2 className="text-4xl font-extrabold text-orange-500 mb-4">
              La sécurité avant tout
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Notre priorité est de vous offrir des trajets sûrs. Rejoignez une
              communauté de conducteurs et passagers vérifiés, avec des avis
              transparents et fiables.
            </p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 : Itinéraires populaires */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-violet-500 mb-10">
            Trajets populaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[cardImage1, cardImage2, cardImage3].map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={image}
                  alt={`Destination ${index + 1}`}
                  className="h-40 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Destination {index + 1}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    À partir de{" "}
                    <span className="text-violet-500 font-bold">10,99 €</span>
                  </p>
                  <button className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 : Avantages supplémentaires */}
      <section className="bg-gradient-to-r from-violet-500 to-orange-500 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Profitez d'avantages exclusifs
          </h2>
          <p className="text-lg mb-8">
            Inscrivez-vous dès maintenant pour accéder à des réductions, des
            primes de fidélité et des offres réservées à notre communauté.
          </p>
          <button className="bg-white text-violet-500 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200">
            Découvrir les avantages
          </button>
        </div>
      </section>
    </div>
  );
};

export default Accueil;
