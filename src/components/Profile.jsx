import React, { useEffect, useState } from "react";


function Profile() {

    const [user, setUser] = useState(null);

    const [editing, setEditing] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    // =========================
    // LOAD USER
    // =========================

    useEffect(() => {

        const savedUser =
            JSON.parse(
                localStorage.getItem("user")
            );


        if (savedUser) {

            setUser(savedUser);

            setName(
                savedUser.name || ""
            );

            setEmail(
                savedUser.email || ""
            );

            setPhone(
                savedUser.phone || ""
            );
        }

    }, []);


    // =========================
    // SAVE PROFILE
    // =========================

    function handleSave() {

        if (!name.trim()) {

            alert(
                "Name is required"
            );

            return;
        }


        if (!email.includes("@")) {

            alert(
                "Enter a valid email"
            );

            return;
        }


        if (!/^\d{10}$/.test(phone)) {

            alert(
                "Enter a valid 10 digit phone number"
            );

            return;
        }


        const updatedUser = {

            ...user,

            name:
                name.trim(),

            email:
                email.trim(),

            phone:
                phone.trim()

        };


        // Save to localStorage

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );


        // Update screen

        setUser(updatedUser);


        // Exit edit mode

        setEditing(false);


        alert(
            "Profile updated successfully ✅"
        );
    }


    // =========================
    // CANCEL EDIT
    // =========================

    function handleCancel() {

        setName(
            user?.name || ""
        );

        setEmail(
            user?.email || ""
        );

        setPhone(
            user?.phone || ""
        );

        setEditing(false);
    }


    // =========================
    // NO USER
    // =========================

    if (!user) {

        return (

            <div className="content">

                <div className="profile">

                    <h2>
                        No Profile Found
                    </h2>

                    <p>
                        Please login first.
                    </p>

                </div>

            </div>
        );
    }


    // =========================
    // PROFILE
    // =========================

    return (

        <div className="content">

            <div className="profile">


                {/* =========================
                    PROFILE TOP
                ========================= */}

                <div className="profile-top">


                    <div className="profile-picture">

                        {user.name
                            ?.charAt(0)
                            ?.toUpperCase()
                        }

                    </div>


                    <div>

                        {editing ? (

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Full Name"
                            />

                        ) : (

                            <h2>
                                {user.name}
                            </h2>

                        )}


                        <p>
                            {user.role === "DOCTOR"
                                ? "Doctor Account"
                                : "Patient Account"
                            }
                        </p>

                    </div>


                    {!editing && (

                        <button
                            className="outline-button"
                            onClick={() =>
                                setEditing(true)
                            }
                        >
                            Edit Profile
                        </button>

                    )}


                    {editing && (

                        <div
                            style={{
                                display: "flex",
                                gap: "10px"
                            }}
                        >

                            <button
                                className="outline-button"
                                onClick={handleSave}
                            >
                                Save
                            </button>


                            <button
                                className="outline-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    )}

                </div>


                {/* =========================
                    PROFILE DETAILS
                ========================= */}

                <div className="profile-details">


                    {/* NAME */}

                    <div>

                        <label>
                            Full Name
                        </label>


                        {editing ? (

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                            />

                        ) : (

                            <p>
                                {user.name}
                            </p>

                        )}

                    </div>


                    {/* EMAIL */}

                    <div>

                        <label>
                            Email
                        </label>


                        {editing ? (

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />

                        ) : (

                            <p>
                                {user.email}
                            </p>

                        )}

                    </div>


                    {/* PHONE */}

                    <div>

                        <label>
                            Phone
                        </label>


                        {editing ? (

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value
                                    )
                                }
                            />

                        ) : (

                            <p>
                                {user.phone}
                            </p>

                        )}

                    </div>


                    {/* ROLE */}

                    <div>

                        <label>
                            Role
                        </label>

                        <p>
                            {user.role}
                        </p>

                    </div>


                    {/* PASSWORD */}

                    <div>

                        <label>
                            Password
                        </label>

                        <p>
                            ••••••••
                        </p>

                    </div>


                    {/* ACCOUNT */}

                    <div>

                        <label>
                            Account Status
                        </label>

                        <p>
                            Active ✅
                        </p>

                    </div>


                </div>

            </div>

        </div>
    );
}


export default Profile;