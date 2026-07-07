import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyMeetings() {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/meetings/my-meetings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMeetings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Meeting
  const deleteMeeting = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meeting?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/meetings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Meeting Deleted Successfully ✅");

      fetchMeetings();
    } catch (error) {
      console.log(error);
      alert("Failed to delete meeting");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>📅 My Meetings</h1>

      {meetings.length === 0 ? (
        <h3>No Meetings Booked</h3>
      ) : (
        meetings.map((meeting) => {
          const meetingCompleted =
            new Date(meeting.meetingDate) < new Date();

          return (
            <div
              key={meeting._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px",
                background: "#fff",
              }}
            >
              <h2>{meeting.meetingTitle}</h2>

              <p>📹 {meeting.meetingType}</p>

              <p>
                📅{" "}
                {new Date(meeting.meetingDate).toLocaleString()}
              </p>
              <p>
<strong>Description :</strong> {meeting.agenda}
</p>

              <p>
                <strong>Status :</strong>{" "}
                {meetingCompleted ? "Completed ✅" : "Scheduled ⏳"}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "15px",
                  flexWrap: "wrap",
                }}
              >
                {!meetingCompleted && (
                  <button
                    onClick={() =>
                      navigate("/video-call", {
                        state: {
                          roomID: meeting.roomID,
                        },
                      })
                    }
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🎥 Join Meeting
                  </button>
                )}

                {meetingCompleted && (
                  <>
                    <button
                      onClick={() =>
                        navigate("/meeting-summary", {
                          state: {
                            roomID: meeting.roomID,
                          },
                        })
                      }
                      style={{
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      🤖 Generate Summary
                    </button>

                    <button
                      onClick={() => deleteMeeting(meeting._id)}
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      🗑 Delete Meeting
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyMeetings;