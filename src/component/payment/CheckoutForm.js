"use client"
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { successMsg } from '../toaster/msg/toaster';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
            {/* AddressElement for collecting billing address */}
            <div style={{ marginBottom: "20px" }}>
                <AddressElement options={{ mode: "billing" }} />
            </div>
            <div className='abcdefg'
                style={{
                    marginBottom: "20px",
                    padding: "15px",
                    border: "1px solid #e6e6e6",
                    borderRadius: "5px"
                }}>
                <CardElement dividers /></div>
            <button style={{ padding: "10px", color: "white", backgroundColor: "#036edd", width: "100%" }} onClick={handleSubmit} disabled={!stripe}> {!loading ? "Pay" : <CircularProgress color="inherit" />}</button>
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
