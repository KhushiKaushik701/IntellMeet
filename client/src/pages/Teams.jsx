import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Teams.css";

function Teams() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/connections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const filteredMembers = members.filter((member) =>

    member.name.toLowerCase().includes(search.toLowerCase()) ||

    member.company.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className="teams-page">

      <div className="teams-header">

        <h1>👥 My Team</h1>

        <p>
          Collaborate with your teammates and schedule meetings effortlessly.
        </p>

        <input
          type="text"
          placeholder="Search Team Member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="team-stats">

        <div className="team-card">
          <h2>{members.length}</h2>
          <p>Total Members</p>
        </div>

        <div className="team-card">
          <h2>
            {
              members.filter((m) => m.status === "Online").length
            }
          </h2>
          <p>Online</p>
        </div>

        <div className="team-card">
          <h2>
            {
              members.filter((m) => m.status !== "Online").length
            }
          </h2>
          <p>Offline</p>
        </div>

      </div>

      <div className="member-grid">

        {filteredMembers.length === 0 ? (

          <h2>No Team Members</h2>

        ) : (

          filteredMembers.map((member) => (

            <div
              className="member-card"
              key={member._id}
            >

              <img
                src={member.image}
                alt={member.name}
              />

              <h2>{member.name}</h2>

              <h4>{member.role}</h4>

              <p>
                🏢 {member.company}
              </p>

              <p>

                {member.status === "Online"
                  ? "🟢 Online"
                  : "⚪ Offline"}

              </p>

              <button
                onClick={() =>
                  window.location.href = "/schedule-meeting"
                }
              >
                📅 Schedule Meeting
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default Teams;