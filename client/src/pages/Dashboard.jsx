import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: "",
    department: "",
  });

  const [stats, setStats] = useState({
  upcomingMeetings: 0,
  completedMeetings: 0,
  totalMeetings: 0,
  totalNotes: 0,
});
  useEffect(() => {
    fetchProfile();
    fetchDashboardStats();
  }, []);

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {

        headers: {

          Authorization: `Bearer ${token}`

        }

      });

      setUser(res.data.user);

    } catch (err) {

      console.log(err);

    }

  };

  const fetchDashboardStats = async () => {

    try {

      const token = localStorage.getItem("token");

const res = await API.get("/dashboard/stats", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      setStats(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

<div className="dashboard">

{/* ================= Sidebar ================= */}

<aside className="sidebar">

<div>

<h2 className="logo">

🚀 IntellMeet

</h2>

<ul>

<li onClick={()=>navigate("/dashboard")}>

🏠 Dashboard

</li>

<li onClick={()=>navigate("/profile")}>

👤 Profile

</li>

<li onClick={()=>navigate("/schedule-meeting")}>
📅 Schedule Meeting
</li>

<li onClick={()=>navigate("/my-meetings")}>

📅 Meetings

</li>


<li onClick={()=>navigate("/notifications")}>

🔔 Notifications

</li>

<li onClick={()=>navigate("/analytics")}>

📊 Analytics

</li>

<li onClick={()=>navigate("/settings")}>

⚙ Settings

</li>

</ul>

</div>

<button

className="logout-btn"

onClick={logout}

>

Logout

</button>

</aside>

{/* ================= Main ================= */}

<div className="dashboard-main">

{/* ================= Hero ================= */}

<div className="hero">

<div>

<h1>

Welcome Back,

{user.name} 👋

</h1>

<p>

Enterprise AI Meeting & Collaboration Platform

</p>

<div className="hero-buttons">

<button

onClick={()=>navigate("/schedule-meeting")}

>

Schedule Meeting

</button>



</div>

</div>

<img

src={

user.profilePicture ||

"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

}

alt="profile"

/>

</div>
{/* ================= Stats Cards ================= */}

<div className="stats-grid">

  <div className="stat-card">
    <span>📅</span>
    <h2>{stats.upcomingMeetings}</h2>
    <p>Upcoming Meetings</p>
  </div>

  <div className="stat-card">
    <span>✅</span>
    <h2>{stats.completedMeetings}</h2>
    <p>Completed Meetings</p>
  </div>

  <div className="stat-card">
    <span>📹</span>
    <h2>{stats.totalMeetings}</h2>
<p>Total Meetings</p>
  </div>

  

  <div className="stat-card">
    <span>⏱</span>
    <h2>48</h2>
    <p>Time Saved</p>
  </div>

  <div className="stat-card">
    <span>📈</span>
    <h2>91%</h2>
    <p>Productivity</p>
  </div>

</div>

{/* ================= Middle Section ================= */}

<div className="dashboard-row">

  {/* Today's Meetings */}

  <div className="dashboard-box">

    <h2>📅 Today's Meetings</h2>

    <div className="meeting-item">

      <h4>10:00 AM</h4>

      <p>HR Weekly Sync</p>

      <button>Join</button>

    </div>

    <div className="meeting-item">

      <h4>2:00 PM</h4>

      <p>Development Standup</p>

      <button>Join</button>

    </div>

    <div className="meeting-item">

      <h4>5:00 PM</h4>

      <p>Project Review</p>

      <button>Join</button>

    </div>

  </div>

  {/* AI Assistant */}

  <div className="dashboard-box">

    <h2>🤖 AI Assistant</h2>

    

    <button
      className="action-btn"
      onClick={() => navigate("/my-meetings")}
    >
      Meeting Notes
    </button>

    <button
      className="action-btn"
      onClick={() => navigate("/analytics")}
    >
      Productivity Report
    </button>

    <button
className="action-btn"
onClick={() => navigate("/schedule-meeting")}
>
📅 Create Meeting
</button>

  </div>

</div>


<div className="dashboard-box">

<h2>📈 Productivity Overview</h2>

<div className="progress-section">

<p>

Meetings

<span>82%</span>

</p>

<div className="progress">

<div
className="progress-fill"
style={{width:"82%"}}
></div>

</div>

<p>

AI Usage

<span>91%</span>

</p>

<div className="progress">

<div
className="progress-fill"
style={{width:"91%"}}
></div>

</div>

<p>

Tasks

<span>74%</span>

</p>

<div className="progress">

<div
className="progress-fill"
style={{width:"74%"}}
></div>

</div>

</div>

</div>



<div className="dashboard-box">

<h2>🔥 Recent Activity</h2>

<ul className="activity-list">

<li>✅ Meeting completed successfully</li>

<li>🤖 AI summary generated</li>

<li>👨‍💼 Connected with new employee</li>

<li>📅 Meeting scheduled</li>

<li>📊 Analytics updated</li>

</ul>

</div>

{/* ================= Team Overview ================= */}

<div className="dashboard-row">

  <div className="dashboard-box">

    <h2>👥 Team Overview</h2>

    <div className="team-grid">

      <div className="team-card">
        <h3>Meetings</h3>
<span>{stats.upcomingMeetings}</span>
      </div>

      <div className="team-card">
        <h3>Teams</h3>
        <span>6</span>
      </div>

      <div className="team-card">
        <h3>Attendance</h3>
        <span>91%</span>
      </div>

      <div className="team-card">
        <h3>Satisfaction</h3>
        <span>98%</span>
      </div>

    </div>

  </div>

</div>



<div className="dashboard-box">

  <h2>⚡ Quick Actions</h2>

  <div className="quick-actions">

    <button
onClick={() => navigate("/schedule-meeting")}
>
📅 Schedule Meeting
</button>

    <button
      onClick={() => navigate("/my-meetings")}
    >
      📅 Meetings
    </button>
    

    <button
      onClick={() => navigate("/notifications")}
    >
      🔔 Notifications
    </button>

    <button
      onClick={() => navigate("/analytics")}
    >
      📊 Analytics
    </button>

    

    <button
      onClick={() => navigate("/settings")}
    >
      ⚙ Settings
    </button>

  </div>

</div>

{/* ================= Enterprise Banner ================= */}

<div className="enterprise-banner">

  <div>

    <h2>
      🚀 Enterprise Collaboration Platform
    </h2>

    <p>

      AI Powered • Secure • Video Meetings •
Real-Time Chat • Analytics • Collaboration

    </p>

  </div>

  

</div>

</div>

</div>

);

}

export default Dashboard;