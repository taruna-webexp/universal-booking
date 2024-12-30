import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { token, amount } = await req.json();

        // Create a PaymentIntent with automatic payment methods enabled, and disable redirects
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: token, // Use the received token ID
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never', // Disable redirection-based methods like 3D Secure
            },
            confirm: true, // Confirm the payment immediately
        });

        // Return the PaymentIntent id
        return new Response(
            JSON.stringify({
                confirm: paymentIntent.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Payment Error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400 }
        );
    }
}
