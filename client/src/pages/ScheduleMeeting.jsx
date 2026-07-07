import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/ScheduleMeeting.css";

function ScheduleMeeting() {
  const navigate = useNavigate();

  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingType, setMeetingType] = useState("Video Meeting");
  const [agenda, setAgenda] = useState("");

  // New States
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    if (!meetingTitle || !meetingDate) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/meetings/book",
        {
          meetingTitle,
          meetingDate,
          meetingType,
          agenda,
          participants,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      navigate("/my-meetings");
    } catch (error) {
      console.log(error);
      alert("Meeting Booking Failed");
    }
  };

  return (
    <div className="schedule-page">
      <div className="schedule-card">
        <h1>📅 Schedule New Meeting</h1>

        <p>Create a new meeting and invite your team.</p>

        <label>Meeting Title</label>

        <input
          type="text"
          placeholder="Project Review"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
        />

        <label>Meeting Date & Time</label>

        <input
          type="datetime-local"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
        />

        <label>Meeting Type</label>

        <select
          value={meetingType}
          onChange={(e) => setMeetingType(e.target.value)}
        >
          <option>Video Meeting</option>
          <option>Sprint Planning</option>
          <option>Project Review</option>
          <option>Client Meeting</option>
          <option>Team Discussion</option>
        </select>

        {/* Participants */}

        <label>Select Participants</label>

        <select
          multiple
          value={participants}
          onChange={(e) =>
            setParticipants(
              [...e.target.selectedOptions].map(
                (option) => option.value
              )
            )
          }
          style={{
            height: "140px",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <label>Meeting Description</label>

        <textarea
          rows="5"
          placeholder="Enter meeting agenda..."
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
        />

        <button onClick={handleBooking}>
          🚀 Create Meeting
        </button>
      </div>
    </div>
  );
}

export default ScheduleMeeting;