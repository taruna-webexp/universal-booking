import { Button } from '@mui/material';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { successMsg } from '../toaster/msg/toaster';

export default function StripePayment({ setPayment }) {
    const [userToken, setUserToken] = useState(null); // Simulated token state
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    console.log("stripePublicKey", stripePublicKey);
    const handleToken = (token, addresses) => {
        console.log("Payment Successful!", token);
        setUserToken(token); // Save token to the state
        setPayment(true)
        successMsg("Payment Successfully"); // Display success message immediately
    };

    console.log("userToken", userToken);

    return (
        <div>
            {userToken !== null ? (
                <Button
                    variant="contained"
                    color="success"
                    disabled
                >
                    Payment Completed
                </Button>
            ) : (
                <StripeCheckout
                    name="My Store"
                    description="Complete your purchase"
                    amount={2000} // Amount in cents (e.g., $20.00)
                    currency="USD"
                    stripeKey={stripePublicKey}
                    token={handleToken} // Function to handle the payment token
                >
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Pay with Stripe
                    </Button>
                </StripeCheckout>
            )}
        </div>
    );
}
