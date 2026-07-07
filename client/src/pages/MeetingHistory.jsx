import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/MeetingHistory.css";

function MeetingHistory() {

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

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

  return (

    <div className="history-page">

      <h1>📚 Meeting History</h1>

      {

        meetings.length===0 ?

        (

          <div className="empty-history">

            <h2>No Meetings Yet</h2>

          </div>

        )

        :

        meetings.map((meeting)=>(

          <div
          key={meeting._id}
          className="history-card"
          >

            <div>

              <h2>{meeting.title || "Meeting"}</h2>

<p>👥 {meeting.participants || "Participants"}</p>
              <p>

                📅

                {

                  new Date(meeting.meetingDate)

                  .toLocaleString()

                }

              </p>

              <p>

                📹 {meeting.meetingType || "Video Call"}

              </p>

              <p>

                📝

                {

                  meeting.agenda

                  ||

                  "No Agenda"

                }

              </p>

            </div>

            <div>

              <span className="status">

                {meeting.status}

              </span>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default MeetingHistory;