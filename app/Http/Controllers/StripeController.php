<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeController extends Controller
{
    public function processPayment(Request $request)
{
    try {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Vérifiez les paramètres reçus
        \Log::info('Payment request received:', $request->all());

        $paymentIntent = PaymentIntent::create([
            'amount' => $request->amount, // En centimes
            'currency' => 'chf',
            'payment_method' => $request->paymentMethodId,
            'confirmation_method' => 'manual',
            'confirm' => true,
        ]);

        return response()->json(['success' => true, 'paymentIntent' => $paymentIntent]);
    } catch (\Exception $e) {
        \Log::error('Stripe Payment Error:', ['message' => $e->getMessage()]);
        return response()->json(['success' => false, 'message' => $e->getMessage()]);
    }
}

}
