import React, { useState } from 'react';
import { Button } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';
import { successMsg } from '../toaster/msg/toaster';  // Assuming you have a success message function

export default function StripePayment() {
    const [userToken, setUserToken] = useState(null); // Simulated token state
    const [paymentId, setPaymentId] = useState(null); // To store the payment ID after success
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY; // Your Stripe public key

    // Token handler after successful payment
    const handleToken = (token) => {
        console.log("Payment Successful!", token); // Log the entire token object
        console.log("Payment ID (Token ID):", token.id); // Log the payment ID (Stripe assigns this ID)

        setUserToken(token); // Save token to the state
        setPaymentId(token.id); // Save payment ID to the state

        successMsg("Payment Successfully"); // Display success message immediately
    };

    return (
        <div>
            {/* Display the payment status */}
            {userToken !== null ? (
                <div>
                    <Button variant="contained" color="success" disabled>
                        Payment Completed
                    </Button>
                    {/* Display the Payment ID once the payment is successful */}
                    <p>Payment ID: {paymentId}</p>
                </div>
            ) : (
                <StripeCheckout
                    name="My Store"
                    description="Complete your purchase"
                    amount={2000} // Amount in cents (e.g., $20.00)
                    currency="USD"
                    stripeKey={stripePublicKey} // Your public Stripe key
                    token={handleToken} // Function to handle the payment token
                    image="https://stripe.com/img/documentation/checkout/marketplace.png" // Image for the Stripe pop-up header
                    ComponentClass="div"
                    label="Buy the Thing" // Text inside the Stripe button
                    panelLabel="Give Money" // Prepended to the amount in the bottom pay button
                    locale="en" // Language of the Stripe Checkout page
                    email="info@vidhub.co"
                    shippingAddress
                    billingAddress={false}
                    zipCode={false}
                    alipay // Accept Alipay (default false)
                    bitcoin // Accept Bitcoins (default false)
                    allowRememberMe // "Remember Me" option (default true)
                >
                    <Button variant="contained" color="primary">
                        Pay with Stripe
                    </Button>
                </StripeCheckout>
            )}
        </div>
    );
}
