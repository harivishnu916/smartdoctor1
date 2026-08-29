import React, { useState } from "react";

import {
    Mail,
    ArrowRight,
    ArrowLeft,
    CheckCircle
} from "lucide-react";

import "./ForgotPassword.css";


function ForgotPassword1({ onBackToLogin, onOtpSent }) {

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);


    async function handleSendOTP() {

        setError("");
        setSuccess(false);

        if (email.trim() === "") {

            setError("Email is required");

            return;
        }


        if (!email.includes("@")) {

            setError("Enter a valid email address");

            return;
        }


        try {

            setLoading(true);

            const response = await fetch(
                "https://smartdoctor1-production.up.railway.app/api/users/forgot-password"
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim()
                    })
                }
            );


            const message =
                await response.text();


            if (!response.ok) {

                setError(
                    message || "Unable to send OTP"
                );

                return;
            }


            setSuccess(true);

            // Go to OTP page
            if (onOtpSent) {

                onOtpSent(
                    email.trim()
                );
            }


        } catch (error) {

            console.error(
                "Forgot password error:",
                error
            );

            setError(
                "Unable to connect to server ❌"
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="forgot-page">

            <div className="forgot-left">

                <div className="forgot-logo">

                    <div className="forgot-logo-box">
                        +
                    </div>

                    <span>
                        CareQueue
                    </span>

                </div>


                <div className="forgot-left-content">

                    <h1>
                        Secure.
                        <br />

                        <span>
                            Simple. Fast.
                        </span>
                    </h1>


                    <p>
                        Reset your password securely
                        and get back to managing your
                        appointments.
                    </p>


                    <div className="forgot-features">

                        <div>
                            <CheckCircle />

                            <span>
                                Secure password recovery
                            </span>
                        </div>


                        <div>
                            <CheckCircle />

                            <span>
                                OTP verification
                            </span>
                        </div>


                        <div>
                            <CheckCircle />

                            <span>
                                Quick account access
                            </span>
                        </div>

                    </div>

                </div>

            </div>


            <div className="forgot-right">

                <div className="forgot-box">

                    <button
                        className="back-button"
                        onClick={onBackToLogin}
                    >

                        <ArrowLeft />

                        Back to Login

                    </button>


                    <div className="forgot-icon">
                        🔐
                    </div>


                    <h2>
                        Forgot Password?
                    </h2>


                    <p className="forgot-subtitle">

                        Enter your registered email
                        address and we'll send you
                        an OTP to reset your password.

                    </p>


                    <label>
                        Email Address
                    </label>


                    <div className="forgot-input">

                        <Mail />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {

                                setEmail(e.target.value);

                                setError("");

                                setSuccess(false);

                            }}
                        />

                    </div>


                    {error && (

                        <p className="forgot-error">
                            {error}
                        </p>

                    )}


                    {success && (

                        <div className="forgot-success">

                            <CheckCircle />

                            <span>
                                OTP sent successfully! ✅
                            </span>

                        </div>

                    )}


                    <button
                        className="send-otp-button"
                        onClick={handleSendOTP}
                        disabled={loading}
                    >

                        {loading
                            ? "Sending OTP..."
                            : "Send OTP"
                        }

                        {!loading && (
                            <ArrowRight />
                        )}

                    </button>


                    <p className="forgot-footer">

                        🔒 Your information is
                        safe and secure

                    </p>

                </div>

            </div>

        </div>
    );
}


export default ForgotPassword1;