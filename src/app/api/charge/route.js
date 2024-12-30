// src/app/api/charge/route.js

import Stripe from 'stripe';

// Initialize Stripe with your secret key (use your own secret key here)
const stripe = new Stripe('sk_test_51PlOw3SBALTJP9oX3LgHuooAvaVB4XcyYki44A5BkMZbdvRKS91Zg2vLcdTADeDcXwtuiRMJVYRNtxvucSULMzCF00zs2gdAF2');
console.log("stripe123", stripe);
// POST request handler to process the payment
export async function POST(req) {
    // Get the body of the request
    const { id, amount } = await req.json();

    try {
        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'Delicious empanadas',
            payment_method: id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',  // Disable redirects after payment
            },
        });

        // Respond with the payment intent ID for confirmation
        return new Response(
            JSON.stringify({
                confirm: paymentIntent.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        // In case of an error, send a 400 response with error message
        return new Response(
            JSON.stringify({
                message: error.message,
            }),
            { status: 400 }
        );
    }
}