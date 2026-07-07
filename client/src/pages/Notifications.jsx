import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Notifications.css";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/notifications", {

        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      setNotifications(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteNotification = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this notification?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/notifications/${id}`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      fetchNotifications();

    } catch (error) {

      console.log(error);

      alert("Failed to delete notification");

    }

  };

  return (

    <div className="notification-page">

      <h1>🔔 Notifications</h1>

      {

        notifications.length === 0 ? (

          <div className="empty">

            <h2>No Notifications</h2>

            <p>You're all caught up 🎉</p>

          </div>

        ) : (

          notifications.map((item) => (

            <div
              className="notification-card"
              key={item._id}
            >

              <div>

                <h3>{item.title}</h3>

                <p>{item.message}</p>

                <small>

                  {new Date(
                    item.createdAt
                  ).toLocaleString()}

                </small>

              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >

                <span className="badge">

                  {item.type}

                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteNotification(item._id)
                  }
                >

                  🗑 Delete

                </button>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}

export default Notifications;