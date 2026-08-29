import React, { useState } from "react";

function BookAppointment() {

    const [doctor, setDoctor] = useState("Dr. Hari");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");

    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState(null);
    const [bookedDate, setBookedDate] = useState("");
    const [bookedTime, setBookedTime] = useState("");
    const [loading, setLoading] = useState(false);


    // =========================
    // TODAY'S DATE
    // =========================

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    // =========================
    // BOOK APPOINTMENT
    // =========================

    async function handleBookAppointment() {

        // Validation
        if (!date || !time || !reason.trim()) {

            alert("Please fill all the fields");

            return;
        }


        // Prevent past date
        if (date < today) {

            alert("Please select today or a future date.");

            return;
        }


        setLoading(true);
        setSuccess(false);


        // =========================
        // GET LOGGED-IN USER
        // =========================

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );


        if (!user) {

            alert("Please login first.");

            setLoading(false);

            return;
        }


        // =========================
        // APPOINTMENT OBJECT
        // =========================

        const appointment = {

            name: user.name || "Patient",

            doctorName: doctor,

            dob: user.dob || "",

            date: date,

            time: time,

            reason: reason.trim(),

            status: "BOOKED"
        };


        console.log(
            "Sending appointment:",
            appointment
        );


        try {

          const response = await fetch(
    "https://smartdoctor1-6.onrender.com/api/appointments",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(appointment)
    }
);


            // =========================
            // BACKEND ERROR
            // =========================

            if (!response.ok) {

                const errorText =
                    await response.text();

                console.error(
                    "Backend error:",
                    errorText
                );

                throw new Error(
                    "Failed to book appointment"
                );
            }


            // =========================
            // RESPONSE
            // =========================

            const data =
                await response.json();


            console.log(
                "Appointment saved:",
                data
            );


            // =========================
            // SAVE BOOKED DETAILS
            // =========================

            setToken(data.token);

            setBookedDate(date);

            setBookedTime(time);

            setSuccess(true);


            // =========================
            // CLEAR FORM
            // =========================

            setDate("");

            setTime("");

            setReason("");


        } catch (error) {

            console.error(
                "Booking error:",
                error
            );

            alert(
                "Unable to book appointment ❌"
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="content">


            {/* =========================
                PAGE TITLE
            ========================= */}

            <div className="page-title">

                <h1>
                    Book Appointment
                </h1>

                <p>
                    Fill the form to book your visit.
                </p>

            </div>


            {/* =========================
                FORM
            ========================= */}

            <div className="form-box">


                {/* DOCTOR */}

                <label>
                    Doctor
                </label>

                <select
                    value={doctor}
                    onChange={(e) =>
                        setDoctor(e.target.value)
                    }
                >

                    <option value="Dr. Hari">
                        Dr. Hari
                    </option>

                    <option value="Dr. Naveen">
                        Dr. Naveen
                    </option>

                    <option value="Dr. Senthil">
                        Dr. Senthil
                    </option>

                    <option value="Dr. Sam">
                        Dr. Sam
                    </option>

                </select>


                {/* DATE */}

                <label>
                    Date
                </label>

                <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                />


                {/* TIME */}

                <label>
                    Time
                </label>

                <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                        setTime(e.target.value)
                    }
                />


                {/* REASON */}

                <label>
                    Reason
                </label>

                <textarea
                    placeholder="Describe your problem"
                    value={reason}
                    onChange={(e) =>
                        setReason(e.target.value)
                    }
                />


                {/* BOOK BUTTON */}

                <button
                    className="green-button"
                    onClick={handleBookAppointment}
                    disabled={loading}
                >

                    {loading
                        ? "Booking..."
                        : "Book Appointment"
                    }

                </button>


                {/* =========================
                    SUCCESS
                ========================= */}

                {success && (

                    <div className="success">

                        <p>
                            Appointment booked successfully. ✅
                        </p>


                        <h2>
                            Your Token Number: {token}
                        </h2>


                        <p>
                            Doctor: {doctor}
                        </p>


                        <p>
                            📅 Date: {bookedDate}
                        </p>


                        <p>
                            🕒 Time: {bookedTime}
                        </p>


                        <p>
                            🎫 Status: BOOKED
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default BookAppointment;