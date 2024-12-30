"use client";
import React, { useState } from 'react';
import { Button } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { successMsg } from '../toaster/msg/toaster'; // Assuming you have this utility

export default function StripePayment() {
    const [paymentId, setPaymentId] = useState(null);
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

    const handleToken = async (token) => {
        console.log(token);
        try {
            const response = await axios.post('/api/payment', {
                id: token.id, // Use token.id directly, not token.card.id
                amount: 4000, // Amount in cents
            });
            setPaymentId(response.data.confirm);
            successMsg("Payment Successful!");
        } catch (error) {
            console.error("Payment Error:", error.response?.data || error.message);
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Stripe Payment</h1>
            {paymentId && <p>Payment ID: {paymentId}</p>}
            <StripeCheckout
                name="My Store"
                description="Complete your purchase"
                amount={4000} // Amount in cents ($40.00)
                currency="USD"
                stripeKey={stripePublicKey}
                token={handleToken}
                image="https://stripe.com/img/documentation/checkout/marketplace.png"
                label="Pay with Stripe"
                panelLabel="Pay {{amount}}"
                locale="en"
                // shippingAddress
                // billingAddress
                allowRememberMe
            >
                <Button variant="contained" color="primary">
                    Buy Now
                </Button>
            </StripeCheckout>
        </div>
    );
}
