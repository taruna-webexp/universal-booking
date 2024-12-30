// src/app/pay.js (or wherever you want to place this component)
"use client"
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { successMsg } from '../toaster/msg/toaster';
import { CircularProgress } from '@mui/material';

// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51PlOw3SBALTJP9oXEUQdAQCLNHmnKddPdQCCQmXPqYGyL8ITqiLjNHy2QFKAyhbOyYIVxrAt1TyWFhxrlFrD2El5008ggIbpdv');

const CheckoutForm = ({ handleCloseModal, onPaymentSuccess, setPaymentComplete }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoding] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a payment method using the Stripe Elements CardElement
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;

            try {
                // Send the payment method ID and amount to your API route
                const { data } = await axios.post('/api/charge', { id, amount: 2099 });
                setLoding(true)
                successMsg("Payment Successfully");
                setPaymentComplete()
                onPaymentSuccess()
                handleCloseModal()
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <CardElement dividers />
            <button style={{ paddingTop: "34px", float: "right", color: "blue" }} onClick={handleSubmit} disabled={!stripe}> {!loading ? "Pay" : <CircularProgress color="inherit" />}</button>
        </>
    );
};

const Pay = ({ handleCloseModal, onPaymentSuccess, setPaymentComplete }) => {



    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm
                handleCloseModal={handleCloseModal}
                onPaymentSuccess={onPaymentSuccess}
                setPaymentComplete={setPaymentComplete}
            />
        </Elements>
    );
};

export default Pay;
