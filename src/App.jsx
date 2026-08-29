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



    const savedUser =
        JSON.parse(
            localStorage.getItem("user")
        );


  

    const [isLoggedIn, setIsLoggedIn] =
        useState(!!savedUser);


   

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



    const [resetEmail, setResetEmail] =
        useState("");


 

    const [
        selectedDoctorId,
        setSelectedDoctorId
    ] = useState(null);


  

    function navigateTo(newPage) {

        setPage(newPage);

        sessionStorage.setItem(
            "currentPage",
            newPage
        );

    }



    function handleLogin(role) {

        setIsLoggedIn(true);

        navigateTo("Dashboard");

    }


   

    function handleLogout() {

        localStorage.removeItem("user");

        sessionStorage.removeItem(
            "currentPage"
        );

        setIsLoggedIn(false);

        setPage("Home");

        setSelectedDoctorId(null);

    }



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




    function handleBackToDoctors() {

        navigateTo(
            "Find Doctor"
        );

    }


   

    function renderPage() {



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



        if (
            page === "Gallery"
        ) {

            return <Gallery />;

        }


   

        if (
            page === "Dashboard"
        ) {

            return <Dashboard />;

        }



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


   

        if (
            page === "Book Appointment"
        ) {

            return (
                <BookAppointment />
            );

        }


   

        if (
            page === "My Appointments"
        ) {

            return (
                <MyAppointments />
            );

        }


      

        if (
            page === "My Queue"
        ) {

            return <MyQueue />;

        }



        if (
            page === "History"
        ) {

            return <History />;

        }



        if (
            page === "Profile"
        ) {

            return <Profile />;

        }



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


       

        return <Dashboard />;

    }


  

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




    if (
        !isLoggedIn &&
        (
            page === "Home" ||
            page === "Gallery"
        )
    ) {

        return renderPage();

    }



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