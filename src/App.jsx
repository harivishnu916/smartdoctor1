import { useState } from "react";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Gallery from "./Gallery";

import ForgotPassword1 from "./ForgotPassword1";
import OTPVerification from "./OTPVerification";
import ResetPassword from "./ResetPassword";

import Dashboard from "./components/Dashboard";
import FindDoctor from "./components/FindDoctor";
import ViewDoctor from "./components/ViewDoctor";
import BookAppointment from "./components/BookAppointment";
import MyAppointments from "./components/MyAppointments";
import MyQueue from "./components/MyQueue";
import History from "./components/History";
import Profile from "./components/Profile";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DoctorQueue from "./components/DoctorQueue";

import "./App.css";


function App() {

    // =========================
    // CHECK SAVED USER
    // =========================

    const savedUser =
        JSON.parse(
            localStorage.getItem("user")
        );


    // =========================
    // LOGIN STATE
    // =========================

    const [isLoggedIn, setIsLoggedIn] =
        useState(!!savedUser);


    // =========================
    // CURRENT PAGE
    // =========================

    const [page, setPage] =
        useState(() => {

            if (
                window.location.pathname === "/"
            ) {

                return "Home";

            }


            const savedPage =
                sessionStorage.getItem(
                    "currentPage"
                );


            if (savedPage) {

                return savedPage;

            }


            if (!savedUser) {

                return "Home";

            }


            return "Dashboard";

        });


    // =========================
    // RESET PASSWORD EMAIL
    // =========================

    const [resetEmail, setResetEmail] =
        useState("");


    // =========================
    // SELECTED DOCTOR
    // =========================

    const [
        selectedDoctorId,
        setSelectedDoctorId
    ] = useState(null);


    // =========================
    // NAVIGATION
    // =========================

    function navigateTo(newPage) {

        setPage(newPage);

        sessionStorage.setItem(
            "currentPage",
            newPage
        );

    }


    // =========================
    // LOGIN SUCCESS
    // =========================

    function handleLogin(role) {

        setIsLoggedIn(true);

        navigateTo("Dashboard");

    }


    // =========================
    // LOGOUT
    // =========================

    function handleLogout() {

        localStorage.removeItem("user");

        sessionStorage.removeItem(
            "currentPage"
        );

        setIsLoggedIn(false);

        setPage("Home");

        setSelectedDoctorId(null);

    }


    // =========================
    // VIEW DOCTOR
    // =========================

    function handleViewDoctor(
        doctorId
    ) {

        setSelectedDoctorId(
            doctorId
        );

        navigateTo(
            "View Doctor"
        );

    }


    // =========================
    // BACK TO FIND DOCTOR
    // =========================

    function handleBackToDoctors() {

        navigateTo(
            "Find Doctor"
        );

    }


    // =========================
    // RENDER PAGE
    // =========================

    function renderPage() {


        // =========================
        // HOME
        // =========================

        if (
            page === "Home"
        ) {

            return (

                <Home

                    onLogin={() =>
                        navigateTo(
                            "Login"
                        )
                    }

                    onSignup={() =>
                        navigateTo(
                            "Signup"
                        )
                    }

                    onBookAppointment={() =>
                        navigateTo(
                            "Login"
                        )
                    }

                    onFindDoctor={() =>
                        navigateTo(
                            "Login"
                        )
                    }

                    onDashboard={() =>
                        navigateTo(
                            "Login"
                        )
                    }

                    onGallery={() =>
                        navigateTo(
                            "Gallery"
                        )
                    }

                />

            );

        }


        // =========================
        // GALLERY
        // =========================

        if (
            page === "Gallery"
        ) {

            return <Gallery />;

        }


        // =========================
        // DASHBOARD
        // =========================

        if (
            page === "Dashboard"
        ) {

            return <Dashboard />;

        }


        // =========================
        // FIND DOCTOR
        // =========================

        if (
            page === "Find Doctor"
        ) {

            return (

                <FindDoctor

                    onViewDoctor={
                        handleViewDoctor
                    }

                />

            );

        }


        // =========================
        // VIEW DOCTOR
        // =========================

        if (
            page === "View Doctor"
        ) {

            return (

                <ViewDoctor

                    doctorId={
                        selectedDoctorId
                    }

                    onBack={
                        handleBackToDoctors
                    }

                />

            );

        }


        // =========================
        // BOOK APPOINTMENT
        // =========================

        if (
            page === "Book Appointment"
        ) {

            return (
                <BookAppointment />
            );

        }


        // =========================
        // MY APPOINTMENTS
        // =========================

        if (
            page === "My Appointments"
        ) {

            return (
                <MyAppointments />
            );

        }


        // =========================
        // MY QUEUE
        // =========================

        if (
            page === "My Queue"
        ) {

            return <MyQueue />;

        }


        // =========================
        // HISTORY
        // =========================

        if (
            page === "History"
        ) {

            return <History />;

        }


        // =========================
        // PROFILE
        // =========================

        if (
            page === "Profile"
        ) {

            return <Profile />;

        }


        // =========================
        // DOCTOR QUEUE
        // =========================

        if (
            page === "Doctor Queue"
        ) {

            const user =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                );


            return (

                <DoctorQueue

                    doctorName={

                        user?.name
                            ?.startsWith("Dr.")

                            ? user.name

                            : `Dr. ${
                                user?.name ||
                                "Hari"
                            }`

                    }

                />

            );

        }


        // =========================
        // DEFAULT
        // =========================

        return <Dashboard />;

    }


    // =========================
    // LOGIN PAGE
    // =========================

    if (
        !isLoggedIn &&
        page === "Login"
    ) {

        return (

            <Login

                onLogin={
                    handleLogin
                }

                onRegister={() =>
                    navigateTo(
                        "Signup"
                    )
                }

                onForgotPassword={() =>
                    navigateTo(
                        "Forgot Password"
                    )
                }

            />

        );

    }


    // =========================
    // FORGOT PASSWORD
    // =========================

    if (
        !isLoggedIn &&
        page === "Forgot Password"
    ) {

        return (

            <ForgotPassword1

                onBackToLogin={() =>
                    navigateTo(
                        "Login"
                    )
                }

                onOtpSent={(email) => {

                    setResetEmail(email);

                    navigateTo(
                        "OTP Verification"
                    );

                }}

            />

        );

    }


    // =========================
    // OTP VERIFICATION
    // =========================

    if (
        !isLoggedIn &&
        page === "OTP Verification"
    ) {

        return (

            <OTPVerification

                email={resetEmail}

                onBack={() =>
                    navigateTo(
                        "Forgot Password"
                    )
                }

                onVerified={(email) => {

                    setResetEmail(email);

                    navigateTo(
                        "Reset Password"
                    );

                }}

            />

        );

    }


    // =========================
    // RESET PASSWORD
    // =========================

    if (
        !isLoggedIn &&
        page === "Reset Password"
    ) {

        return (

            <ResetPassword

                email={resetEmail}

                onBack={() =>
                    navigateTo(
                        "OTP Verification"
                    )
                }

                onResetSuccess={() => {

                    setResetEmail("");

                    navigateTo(
                        "Login"
                    );

                }}

            />

        );

    }


    // =========================
    // SIGNUP
    // =========================

    if (
        !isLoggedIn &&
        page === "Signup"
    ) {

        return (

            <Signup

                onSignup={() =>
                    navigateTo(
                        "Login"
                    )
                }

                onLogin={() =>
                    navigateTo(
                        "Login"
                    )
                }

            />

        );

    }


    // =========================
    // PUBLIC HOME / GALLERY
    // =========================

    if (
        !isLoggedIn &&
        (
            page === "Home" ||
            page === "Gallery"
        )
    ) {

        return renderPage();

    }


    // =========================
    // LOGGED-IN APP
    // =========================

    return (

        <div className="app">

            {/* =========================
                SIDEBAR
            ========================= */}

            <Sidebar

                page={page}

                setPage={
                    navigateTo
                }

                onLogout={
                    handleLogout
                }

            />


            {/* =========================
                MAIN
            ========================= */}

            <div className="main">

                {/* =========================
                    NAVBAR
                ========================= */}

                <Navbar
                    page={page}
                />


                {/* =========================
                    CURRENT PAGE
                ========================= */}

                {renderPage()}

            </div>

        </div>

    );

}


export default App;