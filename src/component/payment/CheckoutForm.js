"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    AddressElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { errorMsg, successMsg } from "../toaster/msg/toaster";
import { CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({

    onPaymentSuccess

}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoding] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();

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

                setLoding(true);
                successMsg("Payment Successfully");

                onPaymentSuccess();
            } catch (error) {
                errorMsg(error.message);
            }
        }
    };

    return (
        <>
            <div></div>
            {/* AddressElement for collecting billing address */}
            {/* <div style={{ marginBottom: "20px" }}>
                <AddressElement options={{ mode: "billing" }} />
            </div> */}
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
                }}
                onClick={handleSubmit}
                disabled={!stripe}
            >
                {" "}
                Pay
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
