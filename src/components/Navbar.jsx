import React from "react";


function Navbar({ page }) {

    // =========================
    // GET CURRENT USER
    // =========================

    const savedUser =
        localStorage.getItem("user");

    const user =
        savedUser
            ? JSON.parse(savedUser)
            : null;


    const userName =
        user?.name || "User";


    const userRole =
        user?.role || "PATIENT";


    // =========================
    // DISPLAY ROLE
    // =========================

    let displayRole = "Patient";

    if (userRole === "DOCTOR") {

        displayRole = "Doctor";

    } else if (userRole === "ADMIN") {

        displayRole = "Admin";

    }


    return (

        <div className="navbar">


            {/* =========================
                PAGE TITLE
            ========================= */}

            <div>

                <p>
                    {displayRole.toUpperCase()} PORTAL
                </p>

                <h2>
                    {page}
                </h2>

            </div>


            {/* =========================
                USER
            ========================= */}

            <div className="patient">


                <div className="patient-icon">

                    {userName
                        .charAt(0)
                        .toUpperCase()}

                </div>


                <div>

                    <b>
                        {userName}
                    </b>


                    <small>
                        {displayRole}
                    </small>

                </div>

            </div>


        </div>
    );
}


export default Navbar;