import React, { useEffect, useState } from "react";


function Dashboard() {

    const [user, setUser] = useState(null);

    const [appointments, setAppointments] =
        useState([]);

    const [queue, setQueue] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    // =========================
    // LOAD DASHBOARD
    // =========================

    useEffect(() => {

        const savedUser =
            JSON.parse(
                localStorage.getItem("user")
            );

        setUser(savedUser);


        loadDashboard();

    }, []);


    // =========================
    // LOAD DATA
    // =========================

    async function loadDashboard() {

        try {

            setLoading(true);


            // =========================
            // APPOINTMENTS
            // =========================

            const appointmentResponse =
                await fetch(
                   "https://smartdoctor1-production.up.railway.app/api/appointments",
                );


            if (appointmentResponse.ok) {

                const data =
                    await appointmentResponse.json();

                setAppointments(data);
            }


            // =========================
            // QUEUES
            // =========================

            const queueResponse =
                await fetch(
                  "https://smartdoctor1-production.up.railway.app/api/queue"
                );


            if (queueResponse.ok) {

                const queues =
                    await queueResponse.json();


                const activeQueue =
                    queues.find(
                        item =>
                            item.status === "ACTIVE"
                    );


                setQueue(
                    activeQueue || null
                );
            }


        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

        } finally {

            setLoading(false);
        }
    }


    // =========================
    // USER APPOINTMENTS
    // =========================

    const userAppointments =
        user
            ? appointments.filter(
                appointment =>
                    appointment.email === user.email ||
                    appointment.name === user.name
            )
            : [];


    // =========================
    // UPCOMING
    // =========================

    const upcomingAppointments =
        userAppointments.filter(
            appointment =>
                appointment.status === "BOOKED"
        );


    // =========================
    // COMPLETED
    // =========================

    const completedAppointments =
        userAppointments.filter(
            appointment =>
                appointment.status === "COMPLETED"
        );


    // =========================
    // NEXT APPOINTMENT
    // =========================

    const nextAppointment =
        upcomingAppointments.length > 0
            ? upcomingAppointments[0]
            : null;


    // =========================
    // QUEUE VALUES
    // =========================

    const yourToken =
        nextAppointment?.token || 0;


    const currentToken =
        queue?.currentToken || 0;


    const peopleAhead =
        yourToken > 0
            ? Math.max(
                0,
                yourToken - currentToken
            )
            : 0;


    const estimatedWait =
        peopleAhead * 5;


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="content">

                <div className="dashboard-box">

                    <h2>
                        Loading Dashboard...
                    </h2>

                </div>

            </div>
        );
    }


    // =========================
    // DASHBOARD
    // =========================

    return (

        <div className="content">


            {/* =========================
                WELCOME
            ========================= */}

            <div className="welcome">

                <div>

                    <p>

                        Welcome,{" "}

                        {user?.name || "User"}

                        {" "}👋

                    </p>


                    <span>
                        Manage your appointments and
                        queue easily.
                    </span>

                </div>


                <div className="medical-icon">
                    +
                </div>

            </div>


            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="cards">


                {/* UPCOMING */}

                <div className="card">

                    <p>
                        Upcoming
                    </p>

                    <h2>
                        {upcomingAppointments.length}
                    </h2>

                </div>


                {/* IN QUEUE */}

                <div className="card">

                    <p>
                        In Queue
                    </p>

                    <h2>
                        {queue
                            ? queue.totalPatients
                            : 0}
                    </h2>

                </div>


                {/* DOCTORS */}

                <div className="card">

                    <p>
                        Doctors
                    </p>

                    <h2>
                        {new Set(
                            userAppointments.map(
                                appointment =>
                                    appointment.doctorName
                            )
                        ).size}
                    </h2>

                </div>


                {/* COMPLETED */}

                <div className="card">

                    <p>
                        Completed
                    </p>

                    <h2>
                        {completedAppointments.length}
                    </h2>

                </div>

            </div>


            {/* =========================
                DASHBOARD BOTTOM
            ========================= */}

            <div className="dashboard-box">


                {/* =========================
                    NEXT APPOINTMENT
                ========================= */}

                <div className="appointment-box">

                    <h3>
                        Next Appointment
                    </h3>


                    {nextAppointment ? (

                        <>

                            <div className="doctor">

                                <div className="doctor-img">

                                    {nextAppointment
                                        .doctorName
                                        ?.charAt(0)
                                        || "D"}

                                </div>


                                <div>

                                    <h3>
                                        {
                                            nextAppointment
                                                .doctorName
                                        }
                                    </h3>

                                    <p>
                                        General Practitioner
                                    </p>

                                </div>

                            </div>


                            <p>

                                📅{" "}

                                {
                                    nextAppointment.date
                                }

                            </p>


                            <p>

                                🕙{" "}

                                {
                                    nextAppointment.time
                                }

                            </p>


                            <button
                                className="green-button"
                            >
                                View Details
                            </button>

                        </>

                    ) : (

                        <div>

                            <p>
                                No upcoming appointment.
                            </p>

                            <p>
                                Book an appointment
                                to see it here.
                            </p>

                        </div>

                    )}

                </div>


                {/* =========================
                    QUEUE STATUS
                ========================= */}

                <div className="quick-box">

                    <h3>
                        Queue Status
                    </h3>


                    {nextAppointment ? (

                        <div className="queue-dashboard">


                            {/* YOUR TOKEN */}

                            <div>

                                <span>
                                    Your Token
                                </span>

                                <b>
                                    {yourToken || "-"}
                                </b>

                            </div>


                            {/* NOW SERVING */}

                            <div>

                                <span>
                                    Now Serving
                                </span>

                                <b>
                                    {currentToken || "-"}
                                </b>

                            </div>


                            {/* PEOPLE AHEAD */}

                            <div>

                                <span>
                                    People Ahead
                                </span>

                                <b>
                                    {peopleAhead}
                                </b>

                            </div>


                            {/* WAIT */}

                            <div>

                                <span>
                                    Estimated Wait
                                </span>

                                <b>
                                    {estimatedWait} min
                                </b>

                            </div>

                        </div>

                    ) : (

                        <div>

                            <p>
                                No active queue.
                            </p>

                            <p>
                                Your queue information
                                will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}


export default Dashboard;