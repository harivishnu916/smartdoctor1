
import "./DoctorDashboard.css";
import { Bell, CalendarDays, Users, Clock, Ticket } from "lucide-react";
function DoctorDashboard(){

   return(
    <>
      <div className="navbar">
       <div>
         <h2>CarePoint Hospital</h2>
           <Bell />
        <h3>Dr. Arun Kumar</h3>
       </div>
        
   </div>
     <div className="info">
    <div className="card">
          <CalendarDays />
        <h2>Today Appointment</h2>
        <p>12</p>
    </div>
     <div className="card">
          <Users />
        <h2>Total Patient</h2>
        <p>48</p>
    </div>
     <div className="card">
        <Clock/>
        <h2>Waiting Patient</h2>
        <p>5</p>
    </div>
      <div className="card">
        <Ticket/>
        <h2>  Current Token</h2>
        <p>23</p>
    </div>

  
   
</div>
<div className="queue-section">
    <h2>Today's Queue</h2>

    <table>
        <thead>
            <tr>
                <th>Token</th>
                <th>Patient Name</th>
                <th>Time</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>101</td>
                <td>Arun</td>
                <td>10:00 AM</td>
                <td>Completed</td>
            </tr>

            <tr>
                <td>102</td>
                <td>Bala</td>
                <td>10:15 AM</td>
                <td>Consulting</td>
            </tr>

            <tr>
                <td>103</td>
                <td>Kumar</td>
                <td>10:30 AM</td>
                <td>Waiting</td>
            </tr>

            <tr>
                <td>104</td>
                <td>Ravi</td>
                <td>10:45 AM</td>
                <td>Waiting</td>
            </tr>
        </tbody>
    </table>
</div>
<div className="current-patient">
    <h2>Current Patient</h2>

    <div className="patient-info">
        <p><strong>Token:</strong> 102</p>
        <p><strong>Patient:</strong> Bala</p>
        <p><strong>Appointment:</strong> 10:15 AM</p>
        <p><strong>Status:</strong> Consulting</p>
    </div>

    <div className="patient-buttons">
        <button>Complete</button>
        <button>Skip</button>
        <button>Call Next Patient</button>
    </div>
</div>
    
    </>
 
     
   )
}
export default DoctorDashboard;