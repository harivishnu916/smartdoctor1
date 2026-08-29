import React, { useState } from "react";

import {
    Lock,
    ArrowRight,
    ArrowLeft,
    CheckCircle
} from "lucide-react";

import "./ResetPassword.css";


function ResetPassword({
    email,
    onBack,
    onResetSuccess
}) {

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);


    async function handleResetPassword() {

        setError("");
        setSuccess(false);


        // =========================
        // VALIDATION
        // =========================

        if (!newPassword.trim()) {

            setError(
                "New password is required"
            );

            return;
        }


        if (newPassword.length < 6) {

            setError(
                "Password must be at least 6 characters"
            );

            return;
        }


        if (!confirmPassword.trim()) {

            setError(
                "Please confirm your password"
            );

            return;
        }


        if (newPassword !== confirmPassword) {

            setError(
                "Passwords do not match"
            );

            return;
        }


        try {

            setLoading(true);


            // =========================
            // BACKEND API
            // =========================

      const response = await fetch(
    "https://smartdoctor1-6.onrender.com/api/users/reset-password",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            newPassword: newPassword
        })
    }
);


            const message =
                await response.text();


            if (!response.ok) {

                setError(
                    message ||
                    "Unable to reset password"
                );

                return;
            }


            // =========================
            // SUCCESS
            // =========================

            setSuccess(true);

            setNewPassword("");
            setConfirmPassword("");


            setTimeout(() => {

                if (onResetSuccess) {
                    onResetSuccess();
                }

            }, 1500);


        } catch (error) {

            console.error(
                "Reset password error:",
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

        <div className="reset-page">

            <div className="reset-box">


                {/* BACK */}

                <button
                    className="back-button"
                    onClick={onBack}
                >

                    <ArrowLeft />

                    Back

                </button>


                {/* ICON */}

                <div className="reset-icon">

                    🔐

                </div>


                <h2>
                    Reset Password
                </h2>


                <p className="reset-subtitle">

                    Create a new password for

                    <br />

                    <strong>
                        {email}
                    </strong>

                </p>


                {/* NEW PASSWORD */}

                <label>
                    New Password
                </label>


                <div className="reset-input">

                    <Lock />

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => {

                            setNewPassword(
                                e.target.value
                            );

                            setError("");

                            setSuccess(false);

                        }}
                    />

                </div>


                {/* CONFIRM PASSWORD */}

                <label>
                    Confirm Password
                </label>


                <div className="reset-input">

                    <Lock />

                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => {

                            setConfirmPassword(
                                e.target.value
                            );

                            setError("");

                            setSuccess(false);

                        }}
                    />

                </div>


                {/* ERROR */}

                {error && (

                    <p className="reset-error">
                        {error}
                    </p>

                )}


                {/* SUCCESS */}

                {success && (

                    <div className="reset-success">

                        <CheckCircle />

                        <span>
                            Password reset successfully! ✅
                        </span>

                    </div>

                )}


                {/* RESET BUTTON */}

                <button
                    className="reset-button"
                    onClick={handleResetPassword}
                    disabled={loading}
                >

                    {loading
                        ? "Resetting..."
                        : "Reset Password"
                    }

                    {!loading && (
                        <ArrowRight />
                    )}

                </button>


                <p className="reset-footer">

                    🔒 Your password is securely encrypted

                </p>

            </div>

        </div>
    );
}


export default ResetPassword;