import React, { useEffect, useState } from "react";

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);


    // GET APPOINTMENTS
    useEffect(() => {
        fetchAppointments();
    }, []);


    async function fetchAppointments() {

        try {

            const response = await fetch(
                "http://localhost:8080/api/appointments"
            );

            if (!response.ok) {
                throw new Error("Failed to load appointments");
            }

            const data = await response.json();

            setAppointments(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load appointments ❌");

        } finally {

            setLoading(false);
        }
    }


    // CANCEL APPOINTMENT
    async function cancelAppointment(id) {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmCancel) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:8080/api/appointments/cancel/${id}`,
                {
                    method: "PUT"
                }
            );


            if (!response.ok) {
                throw new Error(
                    "Failed to cancel appointment"
                );
            }


            // Change status in UI
            setAppointments((previousAppointments) =>
                previousAppointments.map((appointment) =>
                    appointment.id === id
                        ? {
                            ...appointment,
                            status: "CANCELLED"
                        }
                        : appointment
                )
            );


            alert(
                "Appointment cancelled successfully ✅"
            );


        } catch (error) {

            console.error(error);

            alert(
                "Unable to cancel appointment ❌"
            );
        }
    }


    // LOADING
    if (loading) {

        return (

            <div className="content">

                <div className="page-title">

                    <h1>
                        My Appointments
                    </h1>

                    <p>
                        Loading your appointments...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="content">


            {/* PAGE TITLE */}

            <div className="page-title">

                <h1>
                    My Appointments
                </h1>

                <p>
                    View and manage your appointments.
                </p>

            </div>


            {/* NO APPOINTMENTS */}

            {appointments.length === 0 ? (

                <div className="empty-state">

                    <h2>
                        No Appointments
                    </h2>

                    <p>
                        You don't have any appointments yet.
                    </p>

                </div>

            ) : (


                /* APPOINTMENTS */

                <div className="history">

                    {appointments.map((appointment) => (

                        <div
                            className="history-item"
                            key={appointment.id}
                        >


                            {/* LEFT SIDE */}

                            <div>

                                <h3>
                                    Appointment
                                </h3>

                                <p>
                                    Patient: {appointment.name}
                                </p>

                                <p>
                                    Date: {appointment.date}
                                </p>

                                <p>
                                    Time: {appointment.time}
                                </p>

                                <p>
                                    Reason: {appointment.reason}
                                </p>

                            </div>


                            {/* RIGHT SIDE */}

                            <div className="appointment-info">

                                <h3>
                                    🎫 Token: {appointment.token}
                                </h3>


                                <p>
                                    Status:{" "}

                                    <strong>
                                        {appointment.status}
                                    </strong>
                                </p>


                                {/* CANCEL BUTTON */}

                                {appointment.status === "BOOKED" && (

                                    <button
                                        className="cancel-button"
                                        onClick={() =>
                                            cancelAppointment(
                                                appointment.id
                                            )
                                        }
                                    >
                                        Cancel Appointment
                                    </button>

                                )}


                                {/* CANCELLED MESSAGE */}

                                {appointment.status === "CANCELLED" && (

                                    <p>
                                        ❌ Appointment Cancelled
                                    </p>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default MyAppointments;