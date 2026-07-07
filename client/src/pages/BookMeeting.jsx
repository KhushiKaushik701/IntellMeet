import { useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

function BookMeeting() {
  const [meetingDate, setMeetingDate] = useState("");

  const location = useLocation();
  const mentor = location.state;

  if (!mentor) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>No Mentor Selected</h2>
      </div>
    );
  }

  const handleBooking = async () => {
    try {
      if (!meetingDate) {
        alert("Please select meeting date and time");
        return;
      }

      const token = localStorage.getItem("token");

      console.log("Selected Mentor:", mentor);
      console.log("Meeting Date:", meetingDate);
      console.log("Token:", token);

      const res = await API.post(
        "/meetings/book",
        {
          mentorId: mentor._id,
          meetingDate: meetingDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.log("Booking Error:", error);

      if (error.response) {
        console.log("Response Data:", error.response.data);
        alert(error.response.data.message);
      } else {
        alert("Booking Failed");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2ff",
        padding: "40px",
      }}
    >
      <h1 style={{ color: "#4f46e5" }}>
        📅 Book Meeting
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          width: "400px",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={mentor.image}
          alt={mentor.name}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            display: "block",
            margin: "auto",
          }}
        />

        <h2 style={{ textAlign: "center" }}>
          {mentor.name}
        </h2>

        <p style={{ textAlign: "center" }}>
          {mentor.role}
        </p>

        <p style={{ textAlign: "center" }}>
          🏢 {mentor.company}
        </p>

        <p style={{ textAlign: "center" }}>
          ⭐ {mentor.rating}
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          width: "400px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <label>
          <b>Select Date & Time</b>
        </label>

        <br />
        <br />

        <input
          type="datetime-local"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <br />
        <br />

        <button
          onClick={handleBooking}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📅 Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookMeeting;