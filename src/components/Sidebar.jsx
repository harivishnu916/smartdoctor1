import React from "react";

import {
    LayoutDashboard,
    Search,
    CalendarPlus,
    CalendarDays,
    Ticket,
    History,
    User,
    Stethoscope,
    LogOut
} from "lucide-react";


function Sidebar({
    page,
    setPage,
    onLogout
}) {

    // =========================
    // MENU
    // =========================

    const menu = [

        {
            name: "Dashboard",
            icon: <LayoutDashboard />
        },

        {
            name: "Find Doctor",
            icon: <Search />
        },

        {
            name: "Book Appointment",
            icon: <CalendarPlus />
        },

        {
            name: "My Appointments",
            icon: <CalendarDays />
        },

        {
            name: "My Queue",
            icon: <Ticket />
        },

        {
            name: "Doctor Queue",
            icon: <Stethoscope />
        },

        {
            name: "History",
            icon: <History />
        },

        {
            name: "Profile",
            icon: <User />
        }

    ];


    return (

        <aside className="sidebar">

            {/* LOGO */}

            <div className="sidebar-logo">

                <div className="logo-box">
                    +
                </div>

                <span>
                    PULSE POINT
                </span>

            </div>


            {/* ROLE */}

            <div
                style={{
                    padding: "10px 20px",
                    fontSize: "12px",
                    opacity: 0.7
                }}
            >
                PATIENT
            </div>


            {/* MENU */}

            <nav>

                {menu.map((item) => (

                    <button
                        key={item.name}
                        onClick={() =>
                            setPage(item.name)
                        }
                        className={
                            page === item.name
                                ? "active"
                                : ""
                        }
                    >

                        {item.icon}

                        <span>
                            {item.name}
                        </span>

                    </button>

                ))}

            </nav>


            {/* LOGOUT */}

            <button
                onClick={onLogout}
                className="logout-button"
            >

                <LogOut />

                <span>
                    Logout
                </span>

            </button>

        </aside>
    );
}


export default Sidebar;