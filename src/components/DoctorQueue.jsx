import React, { useEffect, useState } from "react";

function DoctorQueue() {
    const [queue, setQueue] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");

    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    // =========================
    // LOAD DOCTORS
    // =========================

    useEffect(() => {
        loadAppointments();
    }, []);

    async function loadAppointments() {
        try {
            setLoading(true);

            const response = await fetch(
             "  https://smartdoctor1-6.onrender.com/api/appointments",
            );

            if (!response.ok) {
                throw new Error("Failed to load appointments");
            }

            const data = await response.json();

            setAppointments(data);

            // Get today's doctors
            const today =
                new Date().toLocaleDateString("en-CA");

            const todayDoctors = [
                ...new Set(
                    data
                        .filter(
                            appointment =>
                                appointment.date === today &&
                                appointment.status === "BOOKED" &&
                                appointment.doctorName
                        )
                        .map(
                            appointment =>
                                appointment.doctorName
                        )
                )
            ];

            setDoctors(todayDoctors);

            // If only one doctor
            if (todayDoctors.length === 1) {
                setSelectedDoctor(todayDoctors[0]);

                await loadDoctorQueue(todayDoctors[0]);
            }

        } catch (error) {
            console.error(
                "Doctor queue error:",
                error
            );

            alert("Unable to load doctors ❌");

        } finally {
            setLoading(false);
        }
    }


    // =========================
    // LOAD SELECTED DOCTOR QUEUE
    // =========================

    async function loadDoctorQueue(doctorName) {

        if (!doctorName) {
            return;
        }

        try {
            setLoading(true);

            const today =
                new Date().toLocaleDateString("en-CA");


            // =========================
            // TODAY'S APPOINTMENTS
            // =========================

            const todayAppointments =
                appointments.filter(
                    appointment =>
                        appointment.doctorName
                            ?.trim()
                            .toLowerCase() ===
                        doctorName
                            ?.trim()
                            .toLowerCase()
                        &&
                        appointment.date === today
                        &&
                        appointment.status === "BOOKED"
                );


            // =========================
            // NO APPOINTMENTS
            // =========================

            if (todayAppointments.length === 0) {

                setQueue(null);

                return;
            }


            // =========================
            // GET QUEUES
            // =========================

            const queueResponse = await fetch(
             "https://smartdoctor1-6.onrender.com/api/queue"
            );

            if (!queueResponse.ok) {
                throw new Error(
                    "Failed to load queues"
                );
            }

            const queues =
                await queueResponse.json();


            // =========================
            // FIND ACTIVE QUEUE
            // =========================

            let existingQueue =
                queues.find(
                    item =>
                        item.doctorName
                            ?.trim()
                            .toLowerCase() ===
                        doctorName
                            ?.trim()
                            .toLowerCase()
                        &&
                        item.date === today
                        &&
                        item.status
                            ?.trim()
                            .toUpperCase() ===
                        "ACTIVE"
                );


            // =========================
            // CREATE QUEUE
            // =========================

            if (!existingQueue) {

                const createResponse =
                    await fetch(
                      "https://smartdoctor1-6.onrender.com/api/queue",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                doctorName:
                                    doctorName,

                                date:
                                    today,

                                currentToken:
                                    1,

                                totalPatients:
                                    todayAppointments.length,

                                status:
                                    "ACTIVE"
                            })
                        }
                    );


                if (!createResponse.ok) {
                    throw new Error(
                        "Failed to create queue"
                    );
                }


                existingQueue =
                    await createResponse.json();
            }


            // =========================
            // REFRESH QUEUE
            // =========================

            const refreshResponse =
                await fetch(
                    `https://smartdoctor1-6.onrender.com/api/queue/refresh/${existingQueue.id}`,
                    {
                        method: "PUT"
                    }
                );


            if (!refreshResponse.ok) {
                throw new Error(
                    "Failed to refresh queue"
                );
            }


            const refreshedQueue =
                await refreshResponse.json();

            setQueue(refreshedQueue);

        } catch (error) {

            console.error(
                "Queue error:",
                error
            );

            alert(
                "Unable to load queue ❌"
            );

        } finally {

            setLoading(false);
        }
    }


    // =========================
    // DOCTOR CHANGE
    // =========================

    function handleDoctorChange(event) {

        const doctor =
            event.target.value;

        setSelectedDoctor(doctor);

        setQueue(null);

        loadDoctorQueue(doctor);
    }


    // =========================
    // NEXT PATIENT
    // =========================

    async function nextPatient() {

        if (!queue) {
            return;
        }

        setUpdating(true);

        try {

            const response =
                await fetch(
                 `https://smartdoctor1-6.onrender.com/api/queue/next/${queue.id}`,
                    {
                        method: "PUT"
                    }
                );


            if (!response.ok) {
                throw new Error(
                    "Failed to update token"
                );
            }


            const data =
                await response.json();

            setQueue(data);


            // Reload appointments
            // so current data stays fresh

            const appointmentResponse =
                await fetch(
                 "https://smartdoctor1-6.onrender.com/api/appointments"
                );


            if (appointmentResponse.ok) {

                const appointmentData =
                    await appointmentResponse.json();

                setAppointments(
                    appointmentData
                );
            }

        } catch (error) {

            console.error(
                "Next patient error:",
                error
            );

            alert(
                "Unable to move to next patient ❌"
            );

        } finally {

            setUpdating(false);
        }
    }


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="content">

                <div className="queue">

                    <h2>
                        Loading Queue...
                    </h2>

                    <p>
                        Please wait.
                    </p>

                </div>

            </div>
        );
    }


    // =========================
    // MAIN
    // =========================

    return (
        <div className="content">

            <div className="page-title">

                <h1>
                    Doctor Queue 🎫
                </h1>

                <p>
                    View real-time doctor queue.
                </p>

            </div>


            <div className="queue">

                {/* SELECT DOCTOR */}

                <label>
                    Select Doctor
                </label>

                <select
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ddd"
                    }}
                >

                    <option value="">
                        Select a doctor
                    </option>


                    {doctors.map(
                        doctor => (

                            <option
                                key={doctor}
                                value={doctor}
                            >
                                {doctor}
                            </option>

                        )
                    )}

                </select>


                {/* NO DOCTORS */}

                {doctors.length === 0 && (

                    <div>

                        <h2>
                            No Active Queue
                        </h2>

                        <p>
                            No booked appointments
                            for any doctor today.
                        </p>

                    </div>

                )}


                {/* QUEUE */}

                {queue && (

                    <>

                        <p>
                            Doctor
                        </p>

                        <h2>
                            {queue.doctorName}
                        </h2>


                        <p>
                            Now Serving
                        </p>

                        <h1>
                            Token {queue.currentToken}
                        </h1>


                        <p>
                            Total Patients:{" "}
                            {queue.totalPatients}
                        </p>


                        <p>
                            Date:{" "}
                            {queue.date}
                        </p>


                        <p>
                            Status:{" "}
                            <strong>
                                {queue.status}
                            </strong>
                        </p>


                        {queue.status === "ACTIVE" && (

                            <button
                                className="green-button"
                                onClick={nextPatient}
                                disabled={updating}
                            >

                                {updating
                                    ? "Updating..."
                                    : "Next Patient →"
                                }

                            </button>

                        )}


                        {queue.status === "COMPLETED" && (

                            <h3>
                                🎉 Queue Completed
                            </h3>

                        )}

                    </>

                )}


                {/* SELECT DOCTOR MESSAGE */}

                {!queue &&
                    doctors.length > 0 &&
                    !loading && (

                        <p>
                            Please select a doctor
                            to view the queue.
                        </p>

                    )}

            </div>

        </div>
    );
}


export default DoctorQueue;