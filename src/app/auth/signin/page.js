"use client";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import { successMsg } from "@/component/toaster/msg/toaster";
import { useEffect } from "react";

export default function SignIn() {
    const { status } = useSession();

    useEffect(() => {
        if (status == "authenticated") {
            // Display success message when the user is authenticated
            successMsg("Successfully signed in!");
        }
    }, [status]);

    const handleSignIn = () => {
        signIn("google", { callbackUrl: "/" }); // Redirects to dashboard after login
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h1 className="text-blue-600 text-2xl font-bold mb-6">
                    Welcome to Universal Booking
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    Sign in with your Google account
                </p>
                <button
                    onClick={handleSignIn}
                    className="bg-blue-600 text-white py-3 rounded-full w-full text-lg transition-all hover:bg-blue-700 flex items-center justify-center"
                >
                    <GoogleIcon className="mr-2" /> Sign in with Google
                </button>
            </div>
        </div>
    );
}
