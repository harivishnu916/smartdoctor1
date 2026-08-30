
import { useState } from "react";

import {
    Mail,
    Lock,
    Eye,
    ArrowRight,
    CheckCircle
} from "lucide-react";

import "./Login.css";


function Login({
    onLogin,
    onRegister,
    onForgotPassword
}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleLogin() {

        setEmailError("");
        setPasswordError("");

        let isValid = true;


        // =========================
        // EMAIL VALIDATION
        // =========================

        if (email.trim() === "") {

            setEmailError(
                "Email is required"
            );

            isValid = false;

        } else if (!email.includes("@")) {

            setEmailError(
                "Enter a valid email address"
            );

            isValid = false;
        }


        // =========================
        // PASSWORD VALIDATION
        // =========================

        if (password.trim() === "") {

            setPasswordError(
                "Password is required"
            );

            isValid = false;

        } else if (password.length < 6) {

            setPasswordError(
                "Password must be at least 6 characters"
            );

            isValid = false;
        }


        if (!isValid) {
            return;
        }


        try {

            setLoading(true);


            // =========================
            // LOGIN API
            // =========================

            const response = await fetch(
                "https://smartdoctor1-8.onrender.com/api/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        password: password
                    })
                }
            );


            // =========================
            // ERROR RESPONSE
            // =========================

            if (!response.ok) {

                const message =
                    await response.text();

                setPasswordError(
                    message ||
                    "Invalid email or password"
                );

                return;
            }


            // =========================
            // SUCCESS RESPONSE
            // =========================

            const user =
                await response.json();


            console.log(
                "Login successful:",
                user
            );


            // =========================
            // SAVE USER
            // =========================

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            // =========================
            // ROLE BASED LOGIN
            // =========================

            if (user.role === "DOCTOR") {

                onLogin("DOCTOR");

            } else if (user.role === "ADMIN") {

                onLogin("ADMIN");

            } else {

                onLogin("PATIENT");
            }


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setPasswordError(
                "Unable to connect to server ❌"
            );


        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="login-page">


            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="login-left">

                <div className="logo">

                    <div className="logo-box">
                        +
                    </div>

                    <span>
                        CareQueue
                    </span>

                </div>


                <div className="left-content">

                    <h1>

                        Your Health.
                        <br />

                        <span>
                            Our Priority.
                        </span>

                    </h1>


                    <p>
                        Book appointments, manage your queue and
                        connect with your doctor easily.
                    </p>


                    <div className="features">


                        <div>

                            <CheckCircle />

                            <span>
                                Easy appointment booking
                            </span>

                        </div>


                        <div>

                            <CheckCircle />

                            <span>
                                Real-time queue updates
                            </span>

                        </div>


                        <div>

                            <CheckCircle />

                            <span>
                                Quick & secure consultation
                            </span>

                        </div>


                    </div>

                </div>

            </div>


            {/* =========================
                RIGHT SIDE
            ========================= */}

            <div className="login-right">

                <div className="login-box">


                    <h2>
                        Welcome Back
                    </h2>


                    <p className="subtitle">
                        Login to continue to your account
                    </p>


                    {/* =========================
                        EMAIL
                    ========================= */}

                    <label>
                        Email / Mobile Number
                    </label>


                    <div className="input-box">

                        <Mail />

                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={email}

                            onChange={(e) => {

                                setEmail(
                                    e.target.value
                                );

                                setEmailError("");

                            }}
                        />

                    </div>


                    {emailError && (

                        <p className="error">
                            {emailError}
                        </p>

                    )}


                    {/* =========================
                        PASSWORD
                    ========================= */}

                    <div className="password-label">

                        <label>
                            Password
                        </label>


                        <span
                            onClick={() => {

                                if (onForgotPassword) {
                                    onForgotPassword();
                                }

                            }}

                            style={{
                                cursor: "pointer"
                            }}
                        >
                            Forgot Password?
                        </span>

                    </div>


                    <div className="input-box">

                        <Lock />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}

                            onChange={(e) => {

                                setPassword(
                                    e.target.value
                                );

                                setPasswordError("");

                            }}
                        />

                        <Eye />

                    </div>


                    {passwordError && (

                        <p className="error">
                            {passwordError}
                        </p>

                    )}


                    {/* =========================
                        REMEMBER ME
                    ========================= */}

                    <div className="remember">

                        <input
                            type="checkbox"
                        />

                        <span>
                            Remember me
                        </span>

                    </div>


                    {/* =========================
                        LOGIN BUTTON
                    ========================= */}

                    <button
                        className="login-button"
                        onClick={handleLogin}
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                        {!loading && (
                            <ArrowRight />
                        )}

                    </button>


                    {/* =========================
                        OR
                    ========================= */}

                    <div className="or">

                        <span>
                            or continue with
                        </span>

                    </div>


                    {/* =========================
                        REGISTER
                    ========================= */}

                    <p className="register">

                        Don't have an account?

                        <span
                            onClick={onRegister}
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            Register
                        </span>

                    </p>


                    {/* =========================
                        SECURITY
                    ========================= */}

                    <p className="security">

                        🔒 Your information is safe and secure

                    </p>


                </div>

            </div>

        </div>
    );
}


export default Login;
