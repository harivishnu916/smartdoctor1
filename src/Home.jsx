import "./Home.css";
import hospitalImage from "./assets/Homepage.jpeg";
import React, { useState } from "react";

import {
    Menu,
    X
} from "lucide-react";


function Home({
    onLogin,
    onSignup,
    onBookAppointment,
    onFindDoctor,
    onDashboard,
    onGallery
}) {

    // =========================
    // MOBILE MENU
    // =========================

    const [menuOpen, setMenuOpen] = useState(false);


    // =========================
    // CLOSE MENU
    // =========================

    const closeMenu = () => {
        setMenuOpen(false);
    };


    return (

        <div className="home">


            {/* =========================
                NAVBAR
            ========================= */}

            <nav className="navbar">


                {/* LOGO */}

                <div className="logo">
                    PulsePoint
                </div>


                {/* =========================
                    HAMBURGER
                ========================= */}

                <button
                    className="menu-toggle"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    aria-label="Toggle navigation menu"
                >

                    {menuOpen ? (
                        <X size={27} />
                    ) : (
                        <Menu size={27} />
                    )}

                </button>


                {/* =========================
                    NAV LINKS
                ========================= */}

                <div
                    className={`nav-links ${
                        menuOpen
                            ? "mobile-open"
                            : ""
                    }`}
                >


                    {/* HOME */}

                    <button
                        onClick={() => {

                            closeMenu();

                            window.location.reload();

                        }}
                    >
                        Home
                    </button>


                    {/* GALLERY */}

                    <button
                        onClick={() => {

                            closeMenu();

                            onGallery();

                        }}
                    >
                        Gallery
                    </button>


                    {/* DASHBOARD */}

                    <button
                        onClick={() => {

                            closeMenu();

                            onDashboard();

                        }}
                    >
                        Dashboard
                    </button>


                    {/* BOOK APPOINTMENT */}

                    <button
                        onClick={() => {

                            closeMenu();

                            onBookAppointment();

                        }}
                    >
                        Book Appointment
                    </button>


                    {/* LOGIN */}

                    <button
                        className="login-btn"
                        onClick={() => {

                            closeMenu();

                            onLogin();

                        }}
                    >
                        Login
                    </button>


                    {/* SIGN UP */}

                    <button
                        className="signup-btn"
                        onClick={() => {

                            closeMenu();

                            onSignup();

                        }}
                    >
                        Sign Up
                    </button>


                </div>

            </nav>


            {/* =========================
                HERO
            ========================= */}

            <section className="hero">


                <div className="hero-content">


                    <p className="welcome">
                        WELCOME TO PULSEPOINT
                    </p>


                    <h1>
                        Your Health,
                        <br />
                        Our Priority
                    </h1>


                    <p className="description">
                        Get quality healthcare from trusted doctors.
                        Find doctors, book appointments and manage
                        your healthcare easily.
                    </p>


                    <div className="hero-buttons">


                        <button
                            className="primary-btn"
                            onClick={onBookAppointment}
                        >
                            Book Appointment
                        </button>


                        <button
                            className="secondary-btn"
                            onClick={onFindDoctor}
                        >
                            Find a Doctor
                        </button>


                    </div>

                </div>


                {/* HERO IMAGE */}

                <div className="hero-image">

                    <img
                        src={hospitalImage}
                        alt="PulsePoint Medical Center"
                    />

                </div>

            </section>


            {/* =========================
                SERVICES
            ========================= */}

            <section className="services">


                <h2>
                    Our Services
                </h2>


                <p className="service-text">
                    Simple healthcare services for your everyday needs
                </p>


                <div className="service-container">


                    {/* FIND DOCTOR */}

                    <div className="service-card">

                        <div className="icon">
                            +
                        </div>


                        <h3>
                            Find a Doctor
                        </h3>


                        <p>
                            Find experienced doctors and choose
                            the right specialist for you.
                        </p>


                        <button
                            onClick={onFindDoctor}
                        >
                            Find Doctor →
                        </button>

                    </div>


                    {/* BOOK APPOINTMENT */}

                    <div className="service-card">

                        <div className="icon">
                            □
                        </div>


                        <h3>
                            Book Appointment
                        </h3>


                        <p>
                            Book an appointment with your preferred
                            doctor at a convenient time.
                        </p>


                        <button
                            onClick={onBookAppointment}
                        >
                            Book Now →
                        </button>

                    </div>


                    {/* DASHBOARD */}

                    <div className="service-card">

                        <div className="icon">
                            ✓
                        </div>


                        <h3>
                            Manage Health
                        </h3>


                        <p>
                            View your appointments and manage
                            your healthcare information.
                        </p>


                        <button
                            onClick={onDashboard}
                        >
                            Dashboard →
                        </button>

                    </div>


                </div>

            </section>


            {/* =========================
                ABOUT
            ========================= */}

            <section className="about">


                <div className="about-text">


                    <p className="small-heading">
                        ABOUT PULSEPOINT
                    </p>


                    <h2>
                        Healthcare made
                        <br />
                        simple for everyone.
                    </h2>


                    <p>
                        PulsePoint helps patients connect with doctors,
                        book appointments and manage their healthcare
                        from one convenient platform.
                    </p>


                    <div className="features">

                        <p>
                            ✓ Qualified Doctors
                        </p>

                        <p>
                            ✓ Easy Appointment Booking
                        </p>

                        <p>
                            ✓ Patient Friendly Platform
                        </p>

                    </div>

                </div>


                <div className="about-box">


                    <h3>
                        Need Medical Help?
                    </h3>


                    <p>
                        Find a doctor and book your appointment today.
                    </p>


                    <button
                        onClick={onFindDoctor}
                    >
                        Find a Doctor →
                    </button>


                </div>

            </section>


            {/* =========================
                FOOTER
            ========================= */}

            <footer className="footer">


                <div>

                    <h2>
                        PulsePoint
                    </h2>


                    <p>
                        Quality healthcare at your fingertips.
                    </p>

                </div>


                <div className="footer-links">


                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        Home
                    </button>


                    <button
                        onClick={onGallery}
                    >
                        Gallery
                    </button>


                    <button
                        onClick={onLogin}
                    >
                        Login
                    </button>


                    <button
                        onClick={onSignup}
                    >
                        Sign Up
                    </button>


                </div>

            </footer>


        </div>
    );
}


export default Home;