import React, { useEffect, useState } from "react";

function History() {

    const [appointments, setAppointments] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    useEffect(() => {

        const savedAppointments =
            JSON.parse(localStorage.getItem("appointments")) || [];

        setAppointments(savedAppointments);

    }, []);


    function openRating(appointment) {
        setSelectedDoctor(appointment);
        setRating(0);
        setReview("");
    }


    function submitRating() {

        if (rating === 0) {
            alert("Please select a rating");
            return;
        }

        const reviews =
            JSON.parse(localStorage.getItem("doctorReviews")) || [];

        const newReview = {
            id: Date.now(),
            doctor: selectedDoctor.doctor,
            rating: rating,
            review: review,
            date: new Date().toLocaleDateString()
        };

        reviews.push(newReview);

        localStorage.setItem(
            "doctorReviews",
            JSON.stringify(reviews)
        );

        alert("Thank you for your feedback! ⭐");

        setSelectedDoctor(null);
        setRating(0);
        setReview("");
    }


    return (

        <div className="content">

            <div className="page-title">

                <h1>Appointment History</h1>

                <p>
                    Your previous appointments.
                </p>

            </div>


            <div className="history">

                {appointments.length === 0 ? (

                    <p>
                        No appointment history found.
                    </p>

                ) : (

                    appointments.map((appointment) => (

                        <div
                            className="history-item"
                            key={appointment.id}
                        >

                            <div>

                                <h3>
                                    {appointment.doctor}
                                </h3>

                                <p>
                                    {appointment.specialization}
                                </p>

                            </div>


                            <p>
                                {appointment.date}
                            </p>


                            <b>
                                {appointment.status}
                            </b>


                            {/* Rating Button */}

                            {appointment.status === "Completed" && (

                                <button
                                    className="rating-button"
                                    onClick={() =>
                                        openRating(appointment)
                                    }
                                >
                                    ⭐ Rate Doctor
                                </button>

                            )}

                        </div>

                    ))

                )}

            </div>


            {/* Rating Box */}

            {selectedDoctor && (

                <div className="rating-overlay">

                    <div className="rating-box">

                        <h2>
                            Rate {selectedDoctor.doctor}
                        </h2>

                        <p>
                            How was your experience?
                        </p>


                        {/* Stars */}

                        <div className="stars">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <span
                                    key={star}
                                    className={
                                        star <= rating
                                            ? "star active"
                                            : "star"
                                    }
                                    onClick={() =>
                                        setRating(star)
                                    }
                                >
                                    ★
                                </span>

                            ))}

                        </div>


                        {/* Review */}

                        <textarea
                            placeholder="Write your experience..."
                            value={review}
                            onChange={(e) =>
                                setReview(e.target.value)
                            }
                        />


                        <div className="rating-actions">

                            <button
                                onClick={() =>
                                    setSelectedDoctor(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="green-button"
                                onClick={submitRating}
                            >
                                Submit Review
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

export default History;