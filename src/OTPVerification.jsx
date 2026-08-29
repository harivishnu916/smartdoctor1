import React, { useState } from "react";

import {
    ShieldCheck,
    ArrowRight,
    ArrowLeft
} from "lucide-react";

import "./OTPVerification.css";


function OTPVerification({
    email,
    onBack,
    onVerified
}) {

    const [otp, setOtp] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleVerifyOTP() {

        setError("");


        if (otp.trim().length !== 6) {

            setError(
                "Enter the 6-digit OTP"
            );

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
           axios.post(
  "https://smartdoctor1-6.onrender.com/api/users/forgot-password",
  data
),
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        otp: otp.trim()
                    })
                }
            );


            const message =
                await response.text();


            if (!response.ok) {

                setError(
                    message ||
                    "Invalid or expired OTP"
                );

                return;
            }


            // OTP verified
            onVerified(email);


        } catch (error) {

            console.error(error);

            setError(
                "Unable to connect to server ❌"
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="otp-page">

            <div className="otp-box">

                <button
                    className="back-button"
                    onClick={onBack}
                >

                    <ArrowLeft />

                    Back

                </button>


                <div className="otp-icon">
                    <ShieldCheck />
                </div>


                <h2>
                    Verify OTP
                </h2>


                <p>

                    Enter the 6-digit OTP sent to

                    <br />

                    <strong>
                        {email}
                    </strong>

                </p>


                <label>
                    Enter OTP
                </label>


                <input
                    className="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => {

                        const value =
                            e.target.value.replace(
                                /\D/g,
                                ""
                            );

                        setOtp(value);

                        setError("");

                    }}
                />


                {error && (

                    <p className="otp-error">
                        {error}
                    </p>

                )}


                <button
                    className="verify-button"
                    onClick={handleVerifyOTP}
                    disabled={loading}
                >

                    {loading
                        ? "Verifying..."
                        : "Verify OTP"
                    }

                    {!loading && (
                        <ArrowRight />
                    )}

                </button>

            </div>

        </div>
    );
}


export default OTPVerification;