import React, {
    useEffect,
    useState,
    useRef
} from "react";

import { Client } from "@stomp/stompjs";


function MyQueue() {

    const [queue, setQueue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myAppointment, setMyAppointment] = useState(null);

    const clientRef = useRef(null);


    // =========================
    // LOAD ON PAGE OPEN
    // =========================

    useEffect(() => {

        loadQueue();

        return () => {

            if (clientRef.current) {

                clientRef.current.deactivate();

                clientRef.current = null;

            }

        };

    }, []);


    // =========================
    // LOAD QUEUE
    // =========================

    async function loadQueue() {

        try {

            setLoading(true);

            const user = JSON.parse(
                localStorage.getItem("user")
            );


            if (!user) {

                setQueue(null);
                setMyAppointment(null);

                return;

            }


            // =========================
            // GET ALL APPOINTMENTS
            // =========================

            const response = await fetch(
               "https://smartdoctor1-production.up.railway.app/api/appointments"
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to load appointments"
                );

            }


            const appointments =
                await response.json();


            console.log(
                "All appointments:",
                appointments
            );


            // =========================
            // TODAY
            // =========================

            const today =
                new Date().toLocaleDateString(
                    "en-CA"
                );


            console.log(
                "Today:",
                today
            );


            // =========================
            // FIND CURRENT USER
            // =========================

            const patientAppointments =
                appointments.filter(
                    appointment => {

                        const samePatient =
                            appointment.patientEmail === user.email ||
                            appointment.email === user.email ||
                            appointment.patientName === user.name ||
                            appointment.name === user.name;

                        const booked =
                            appointment.status === "BOOKED";

                        const todayAppointment =
                            appointment.date === today;

                        return (
                            samePatient &&
                            booked &&
                            todayAppointment
                        );

                    }
                );


            console.log(
                "My today's appointments:",
                patientAppointments
            );


            // =========================
            // NO APPOINTMENT
            // =========================

            if (
                patientAppointments.length === 0
            ) {

                setQueue(null);
                setMyAppointment(null);

                return;

            }


            // =========================
            // LATEST APPOINTMENT
            // =========================

            const appointment =
                patientAppointments[
                    patientAppointments.length - 1
                ];


            console.log(
                "Selected appointment:",
                appointment
            );


            setMyAppointment(
                appointment
            );


            const doctorName =
                appointment.doctorName;

            const token =
                appointment.token;

            const date =
                appointment.date;


            // =========================
            // VALIDATE
            // =========================

            if (
                !doctorName ||
                !token ||
                !date
            ) {

                console.error(
                    "Invalid appointment data:",
                    appointment
                );

                setQueue(null);

                return;

            }


            // =========================
            // GET QUEUE STATUS
            // =========================

            const queueResponse =
                await fetch(
                    `https://smartdoctor1-production.up.railway.app/api/queue/status` +
                    `?doctorName=${encodeURIComponent(
                        doctorName
                    )}` +
                    `&date=${date}` +
                    `&token=${token}`
                );


            if (!queueResponse.ok) {

                throw new Error(
                    "Failed to load queue status"
                );

            }


            const queueData =
                await queueResponse.json();


            console.log(
                "Queue data:",
                queueData
            );


            setQueue(queueData);


            // =========================
            // WEBSOCKET
            // =========================

            connectWebSocket(
                doctorName
            );


        } catch (error) {

            console.error(
                "Queue error:",
                error
            );

            setQueue(null);

        } finally {

            setLoading(false);

        }

    }


    // =========================
    // WEBSOCKET
    // =========================

    function connectWebSocket(
        doctorName
    ) {

        if (clientRef.current) {

            return;

        }


        const client =
            new Client({

                brokerURL:
                  "wss://smartdoctor1-production.up.railway.app/ws",

                reconnectDelay:
                    5000,


                // =========================
                // CONNECT
                // =========================

                onConnect: () => {

                    console.log(
                        "WebSocket connected ✅"
                    );


                    client.subscribe(

                        `/topic/queue/${doctorName}`,

                        message => {

                            try {

                                const updatedQueue =
                                    JSON.parse(
                                        message.body
                                    );


                                console.log(
                                    "REAL-TIME QUEUE UPDATE ⚡",
                                    updatedQueue
                                );


                                setQueue(
                                    currentQueue => {

                                        if (
                                            !currentQueue
                                        ) {

                                            return updatedQueue;

                                        }


                                        return {

                                            ...currentQueue,

                                            currentToken:
                                                updatedQueue.currentToken,

                                            totalPatients:
                                                updatedQueue.totalPatients,

                                            status:
                                                updatedQueue.status,

                                            doctorName:
                                                updatedQueue.doctorName,

                                            date:
                                                updatedQueue.date

                                        };

                                    }
                                );


                            } catch (error) {

                                console.error(
                                    "WebSocket message error:",
                                    error
                                );

                            }

                        }

                    );

                },


                // =========================
                // STOMP ERROR
                // =========================

                onStompError: frame => {

                    console.error(
                        "STOMP error:",
                        frame
                    );

                },


                // =========================
                // SOCKET ERROR
                // =========================

                onWebSocketError: error => {

                    console.error(
                        "WebSocket error:",
                        error
                    );

                }

            });


        clientRef.current =
            client;


        client.activate();

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
    // NO ACTIVE QUEUE
    // =========================

    if (
        !queue ||
        !myAppointment
    ) {

        return (

            <div className="content">

                <div className="queue">

                    <div className="queue-icon">
                        🎫
                    </div>

                    <h2>
                        No Active Queue
                    </h2>

                    <p>
                        Please book an appointment
                        for today.
                    </p>

                </div>

            </div>

        );

    }


    // =========================
    // QUEUE DATA
    // =========================

    const currentToken =
        Number(
            queue.currentToken || 0
        );


    const yourToken =
        Number(
            myAppointment.token || 0
        );


    // =========================
    // PEOPLE AHEAD
    // =========================

    const peopleAhead =
        Math.max(
            0,
            yourToken - currentToken
        );


    // =========================
    // WAIT TIME
    // =========================

    const estimatedWait =
        peopleAhead * 5;


    // =========================
    // PROGRESS
    // =========================

    const progress =
        yourToken > 0
            ? Math.min(
                100,
                (
                    currentToken /
                    yourToken
                ) * 100
            )
            : 0;


    // =========================
    // UI
    // =========================

    return (

        <div className="content">

            <div className="queue">

                <div className="queue-icon">
                    🎫
                </div>


                <h2>
                    #{yourToken}
                </h2>


                <h3>
                    You're in the queue
                </h3>


                <p>
                    Please wait for your turn
                </p>


                {/* =========================
                    QUEUE INFO
                ========================= */}

                <div className="queue-info">

                    <div>

                        <span>
                            Now Serving
                        </span>

                        <b>
                            {currentToken}
                        </b>

                    </div>


                    <div>

                        <span>
                            People Ahead
                        </span>

                        <b>
                            {peopleAhead}
                        </b>

                    </div>


                    <div>

                        <span>
                            Estimated Wait
                        </span>

                        <b>
                            {estimatedWait} min
                        </b>

                    </div>

                </div>


                {/* =========================
                    PROGRESS
                ========================= */}

                <div className="progress">

                    <div
                        style={{
                            width:
                                `${progress}%`
                        }}
                    />

                </div>


                <small>
                    Queue updates in real-time ⚡
                </small>


                {/* =========================
                    DOCTOR
                ========================= */}

                <div
                    style={{
                        marginTop: "25px"
                    }}
                >

                    <p>
                        Doctor
                    </p>

                    <h3>
                        {myAppointment.doctorName}
                    </h3>

                </div>


                {/* =========================
                    DETAILS
                ========================= */}

                <div
                    style={{
                        marginTop: "20px"
                    }}
                >

                    <p>
                        Your Token
                    </p>

                    <h1>
                        Token {yourToken}
                    </h1>


                    <p>
                        Now Serving
                    </p>

                    <h2>
                        Token {currentToken}
                    </h2>


                    <p>
                        Total Patients
                    </p>

                    <h3>
                        {queue.totalPatients}
                    </h3>


                    <p>
                        Date
                    </p>

                    <h3>
                        {myAppointment.date}
                    </h3>


                    <p>
                        Status
                    </p>

                    <strong>
                        {myAppointment.status}
                    </strong>

                </div>

            </div>

        </div>

    );

}


export default MyQueue;