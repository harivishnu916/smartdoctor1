import React from "react";
import  "./AdminDashboard.css"
import {
    Users,
    UserRound,
    CalendarDays,
    Ticket
} from "lucide-react";

function AdminDashboard() {

    return (
        <div className="admin-content">

            <div className="admin-title">
                <h1>Admin Dashboard</h1>
                <p>Manage hospital operations and monitor activities.</p>
            </div>


            {/* Summary Cards */}

            <div className="admin-cards">

                <div className="admin-card">
                    <Users />
                    <div>
                        <p>Total Doctors</p>
                        <h2>25</h2>
                    </div>
                </div>


                <div className="admin-card">
                    <UserRound />
                    <div>
                        <p>Total Patients</p>
                        <h2>450</h2>
                    </div>
                </div>


                <div className="admin-card">
                    <CalendarDays />
                    <div>
                        <p>Appointments</p>
                        <h2>82</h2>
                    </div>
                </div>


                <div className="admin-card">
                    <Ticket />
                    <div>
                        <p>Active Queues</p>
                        <h2>12</h2>
                    </div>
                </div>

            </div>


            {/* Doctor Management */}

            <div className="admin-section">

                <h2>Doctor Management</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Specialization</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Dr. Hari</td>
                            <td>General Practitioner</td>
                            <td>Active</td>
                        </tr>

                        <tr>
                            <td>Dr. Naveen</td>
                            <td>Pediatrician</td>
                            <td>Active</td>
                        </tr>

                        <tr>
                            <td>Dr. Senthil</td>
                            <td>Dermatologist</td>
                            <td>Active</td>
                        </tr>

                    </tbody>

                </table>

            </div>


         

            <div className="admin-section">

                <h2>Recent Appointments</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Prisha</td>
                            <td>Dr. Hari</td>
                            <td>22 Aug 2026</td>
                            <td>Confirmed</td>
                        </tr>

                        <tr>
                            <td>Bala</td>
                            <td>Dr. Naveen</td>
                            <td>22 Aug 2026</td>
                            <td>Completed</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminDashboard;