import { useEffect, useState } from "react";
import API from "../services/api";
import "./MyConnections.css";

function MyConnections() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/connections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConnections(res.data);
    } catch (error) {
      console.log(error);
    }
  };
return (
  <div className="connections-page">
    <h1>🔗 My Connections</h1>

    <div className="connection-grid">
      {connections.map((connection) => (
        <div className="connection-card" key={connection._id}>
          <img
            src={connection.mentor.image}
            alt={connection.mentor.name}
          />

          <h2>{connection.mentor.name}</h2>

          <p>{connection.mentor.role}</p>

          <p>🏢 {connection.mentor.company}</p>

          <div
            className={`status ${
              connection.status === "Accepted"
                ? "accepted"
                : "pending"
            }`}
          >
            {connection.status}
          </div>

          <button className="view-btn">
            View Profile
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default MyConnections;