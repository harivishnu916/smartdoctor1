import React, { useEffect, useState } from "react";

function ViewDoctor({ doctorId, onBack, onBook }) {

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

  fetch(`http://localhost:8080/api/doctors/${doctorId}`)

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Doctor not found");
                }

                return response.json();
            })

            .then((data) => {

                setDoctor(data);
                setLoading(false);

            })

            .catch((error) => {

                console.error(error);

                setError("Unable to load doctor details");

                setLoading(false);
            });

    }, [doctorId]);


    if (loading) {

        return (
            <div className="content">
                <p>Loading doctor details...</p>
            </div>
        );
    }


    if (error) {

        return (
            <div className="content">

                <p className="error">
                    {error}
                </p>

                <button onClick={onBack}>
                    ← Back
                </button>

            </div>
        );
    }


    return (

        <div className="content">

            <div className="page-title">

                <h1>Doctor Details</h1>

                <p>
                    Complete doctor information
                </p>

            </div>


            <div className="doctor-details-box">

                <div className="doctor-img large">
                    {doctor.name.charAt(4)}
                </div>


                <h2>
                    {doctor.name}
                </h2>


                <p>
                    {doctor.specialization}
                </p>


                <div className="doctor-info">

                    <p>
                        ⭐ Rating: 4.8
                    </p>

                    <p>
                        💼 Experience: {doctor.experience} Years
                    </p>

                    <p>
                        📧 Email: {doctor.email}
                    </p>

                    <p>
                        📞 Phone: {doctor.number}
                    </p>

                    <p>
                        {doctor.available
                            ? "🟢 Available"
                            : "🔴 Not Available"
                        }
                    </p>

                </div>


                <div className="doctor-actions">

                    <button onClick={onBack}>
                        ← Back
                    </button>


                   

                </div>

            </div>

        </div>
    );
}

export default ViewDoctor;