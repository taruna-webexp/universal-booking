"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { errorMsg, successMsg } from "../toaster/msg/toaster";
import { CircularProgress } from "@mui/material";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false); // Corrected spelling of 'loading'

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Set loading to true when the payment process starts
        setLoading(true);

        // Create a payment method using the Stripe Elements CardElement
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;

            try {
                // Send the payment method ID and amount to your API route
                const { data } = await axios.post("/api/charge", { id, amount: 2099 });
                successMsg("Payment Successfully");

                // Call the success callback
                onPaymentSuccess();
            } catch (error) {
                errorMsg(error.message);
            }
        } else {
            errorMsg(error.message);
        }

        // Reset loading after response is received
        setLoading(false);
    };

    return (
        <>
            <label>Credit or debit card:</label>
            <div
                className="abcdefg"
                style={{
                    marginBottom: "20px",
                    padding: "15px",
                    border: "1px solid #e6e6e6",
                    borderRadius: "5px",
                }}
            >
                <CardElement dividers />
            </div>
            <button
                type="submit"
                style={{
                    padding: "10px",
                    color: "white",
                    backgroundColor: "#036edd",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={handleSubmit}
                disabled={!stripe || loading} // Disable button during loading
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Pay"}
            </button>
        </>
    );
};

const Pay = ({ onPaymentSuccess }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm onPaymentSuccess={onPaymentSuccess} />
        </Elements>
    );
};

export default Pay;
