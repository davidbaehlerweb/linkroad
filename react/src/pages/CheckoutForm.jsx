import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ trip }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      alert("Stripe n'est pas encore initialisé.");
      return;
    }
  
    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
  
    if (error) {
      console.error("Erreur Stripe:", error.message);
      alert("Erreur Stripe : " + error.message);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8000/api/stripe/payment", {
        amount: trip.price * trip.passengers * 100, // Montant en centimes
        paymentMethodId: paymentMethod.id,
      });
  
      if (response.data.success) {
        alert("Paiement réussi !");
      } else {
        console.error("Erreur de paiement:", response.data.message);
        alert("Paiement échoué : " + response.data.message);
      }
    } catch (err) {
      console.error("Erreur serveur:", err.message);
      alert("Erreur lors du traitement du paiement : " + err.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
      >
        Payer
      </button>
    </form>
  );
};

export default CheckoutForm;
