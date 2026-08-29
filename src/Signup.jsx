import { useState } from "react";

import {
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    ArrowRight
} from "lucide-react";

import "./Signup.css";


function Signup({ onSignup, onLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    async function handleSignup() {

        setError("");
        setSuccess(false);


        // =========================
        // EMPTY VALIDATION
        // =========================

        if (
            !name.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please fill all the fields"
            );

            return;
        }


        // =========================
        // EMAIL VALIDATION
        // =========================

        if (!email.includes("@")) {

            setError(
                "Enter a valid email address"
            );

            return;
        }


        // =========================
        // PHONE VALIDATION
        // =========================

        if (!/^\d{10}$/.test(phone)) {

            setError(
                "Enter a valid 10 digit mobile number"
            );

            return;
        }


        // =========================
        // PASSWORD VALIDATION
        // =========================

        if (password.length < 6) {

            setError(
                "Password must be at least 6 characters"
            );

            return;
        }


        // =========================
        // CONFIRM PASSWORD
        // =========================

        if (password !== confirmPassword) {

            setError(
                "Passwords do not match"
            );

            return;
        }


        // =========================
        // USER OBJECT
        // =========================

        const user = {

            name: name.trim(),

            email: email.trim(),

            phone: phone,

            password: password,

            role: "PATIENT"
        };


        try {

            setLoading(true);


            // =========================
            // BACKEND SIGNUP
            // =========================

            const response =
                await fetch(
                    "http://localhost:8080/api/users/signup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(user)
                    }
                );


            // =========================
            // ERROR
            // =========================

            if (!response.ok) {

                const message =
                    await response.text();


                setError(
                    message ||
                    "Signup failed"
                );

                return;
            }


            // =========================
            // SUCCESS RESPONSE
            // =========================

            const savedUser =
                await response.json();


            console.log(
                "Signup successful:",
                savedUser
            );


            // Save backend user
            // in localStorage

            localStorage.setItem(
                "user",
                JSON.stringify(savedUser)
            );


            setSuccess(true);


            // Clear fields

            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");


            // Go to login

            setTimeout(() => {

                if (onSignup) {
                    onSignup();
                }

            }, 1000);


        } catch (error) {

            console.error(
                "Signup error:",
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

        <div className="signup-page">

            <div className="signup-box">


                {/* LOGO */}

                <div className="signup-logo">

                    <div className="signup-logo-box">
                        +
                    </div>

                    <span>
                        PULSE POINT
                    </span>

                </div>


                {/* HEADING */}

                <h1>
                    Create Account
                </h1>


                <p className="signup-subtitle">
                    Create your account to continue
                </p>


                {/* NAME */}

                <label>
                    Full Name
                </label>

                <div className="signup-input">

                    <User />

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => {

                            setName(
                                e.target.value
                            );

                            setError("");
                        }}
                    />

                </div>


                {/* EMAIL */}

                <label>
                    Email
                </label>

                <div className="signup-input">

                    <Mail />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {

                            setEmail(
                                e.target.value
                            );

                            setError("");
                        }}
                    />

                </div>


                {/* PHONE */}

                <label>
                    Mobile Number
                </label>

                <div className="signup-input">

                    <Phone />

                    <input
                        type="text"
                        placeholder="Enter your mobile number"
                        value={phone}
                        onChange={(e) => {

                            setPhone(
                                e.target.value
                            );

                            setError("");
                        }}
                    />

                </div>


                {/* PASSWORD */}

                <label>
                    Password
                </label>

                <div className="signup-input">

                    <Lock />

                    <input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => {

                            setPassword(
                                e.target.value
                            );

                            setError("");
                        }}
                    />

                    <Eye />

                </div>


                {/* CONFIRM PASSWORD */}

                <label>
                    Confirm Password
                </label>

                <div className="signup-input">

                    <Lock />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => {

                            setConfirmPassword(
                                e.target.value
                            );

                            setError("");
                        }}
                    />

                </div>


                {/* ERROR */}

                {error && (

                    <p className="signup-error">
                        {error}
                    </p>

                )}


                {/* SUCCESS */}

                {success && (

                    <p className="signup-success">
                        Account created successfully! ✅
                    </p>

                )}


                {/* CREATE ACCOUNT */}

                <button
                    className="signup-button"
                    onClick={handleSignup}
                    disabled={loading}
                >

                    {loading
                        ? "Creating Account..."
                        : "Create Account"
                    }

                    {!loading && (
                        <ArrowRight />
                    )}

                </button>


                {/* LOGIN */}

                <p className="login-link">

                    Already have an account?

                    <span
                        onClick={onLogin}
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        Login
                    </span>

                </p>


                {/* SECURITY */}

                <p className="security">
                    🔒 Your information is safe and secure
                </p>


            </div>

        </div>
    );
}


export default Signup;