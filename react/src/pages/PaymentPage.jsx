import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";


// Chargez votre clé publique Stripe
const stripePromise = loadStripe("pk_live_51OK4rBCZhPBVRN3nRAePhurtNlMDDdP0lWEzxrzBjfzPRejel6DztVZxLFzKBJJ7qk5pJqMBI4D5H4ZhQCc0HJuo00dzsmhNY4");

const PaymentPage = () => {
  // Récupère les informations du trajet via `useLocation`
  const location = useLocation();
  const { trip } = location.state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Paiement pour le trajet
        </h1>
        <p className="text-gray-600 mb-6">
          Vous allez payer{" "}
          <span className="font-semibold text-purple-600">
            {trip.price * trip.passengers} CHF
          </span>{" "}
          pour le trajet de {trip.departure} à {trip.destination}.
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm trip={trip} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
