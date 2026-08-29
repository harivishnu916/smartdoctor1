import React, { useEffect, useState } from "react";

function FindDoctor({ onViewDoctor }) {

    const [search, setSearch] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


  
    useEffect(() => {

 fetch("https://smartdoctor1-6.onrender.com/api/doctors")

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch doctors");
                }

                return response.json();
            })

            .then((data) => {

                setDoctors(data);
                setLoading(false);

            })

            .catch((error) => {

                console.error("Error:", error);

                setError("Unable to load doctors");
                setLoading(false);

            });

    }, []);


    // Search doctors
    const filteredDoctors = doctors.filter((doctor) => {

        const searchText = search.toLowerCase();

        return (
            doctor.name
                ?.toLowerCase()
                .includes(searchText) ||

            doctor.specialization
                ?.toLowerCase()
                .includes(searchText)
        );

    });


    return (

        <div className="content">

            {/* Page Title */}

            <div className="page-title">

                <h1>
                    Find Doctor
                </h1>

                <p>
                    Find the right doctor for your appointment.
                </p>

            </div>


            {/* Search */}

            <input
                className="search"
                type="text"
                placeholder="Search doctor or specialization"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />


            {/* Loading */}

            {loading && (

                <div className="loading">
                    Loading doctors...
                </div>

            )}


            {/* Error */}

            {error && !loading && (

                <div className="error">
                    {error}
                </div>

            )}


            {/* Doctor Grid */}

            {!loading && !error && (

                <div className="doctor-grid">

                    {filteredDoctors.map((doctor) => (

                        <div
                            className="doctor-card"
                            key={doctor.id}
                        >

                            {/* Doctor Image */}

                            <div className="doctor-img large">

                                {doctor.name
                                    ? doctor.name.charAt(4)
                                    : "D"
                                }

                            </div>


                            {/* Doctor Name */}

                            <h3>
                                {doctor.name}
                            </h3>


                            {/* Specialization */}

                            <p>
                                {doctor.specialization}
                            </p>


                            {/* Details */}

                            <div className="doctor-details">

                                ⭐ 4.8

                                &nbsp;&nbsp;

                                {doctor.experience} Years

                            </div>


                            {/* Availability */}

                            <p>

                                {doctor.available ? (

                                    <span className="available">
                                        🟢 Available
                                    </span>

                                ) : (

                                    <span className="not-available">
                                        🔴 Not Available
                                    </span>

                                )}

                            </p>


                            {/* View Doctor */}

                            <button
                                className="green-button"
                                onClick={() =>
                                    onViewDoctor(doctor.id)
                                }
                            >

                                View Doctor

                            </button>

                        </div>

                    ))}


                    {/* No Results */}

                    {filteredDoctors.length === 0 && (

                        <p className="no-doctors">
                            No doctors found.
                        </p>

                    )}

                </div>

            )}

        </div>
    );
}

export default FindDoctor;