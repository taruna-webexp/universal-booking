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
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                <h1 className="text-blue-600 text-2xl font-bold mb-6">
                    Universal Booking
                </h1>
                <p className="text-gray-600 text-md mb-8">
                    Sign in with your Google account
                </p>
                <button
                    onClick={handleSignIn}
                    className="flex items-center justify-center w-full py-3 text-lg font-medium text-black transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-lg hover:bg-gray-100 hover:shadow-md active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <img src="/google.png" alt="Google logo" width={20} className="mr-3" />
                    Sign in with Google
                </button>

            </div>
        </div>
    );
}
