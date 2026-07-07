import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { sendConnectionRequest } from "../services/api";
import "../styles/Employees.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const fetchEmployees = async () => {
    try {
      // Backend same hai
      const res = await API.get(`/mentors?search=${search}`);
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvite = async (employeeId) => {
    try {
      const token = localStorage.getItem("token");

      await sendConnectionRequest(employeeId, token);

      alert("Invitation Sent Successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="employee-page">

      <div className="employee-header">

        <h1>👨‍💼 Employees Directory</h1>

        <p>
          Discover employees, collaborate with your team and
          schedule productive meetings.
        </p>

        <input
          type="text"
          placeholder="🔍 Search Employees..."
          className="employee-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="employee-grid">

        {employees.length === 0 ? (

          <h2>No Employee Found</h2>

        ) : (

          employees.map((employee) => (

            <div
              className="employee-card"
              key={employee._id}
            >

              <img
                src={employee.image}
                alt={employee.name}
              />

              <h2>{employee.name}</h2>

              <h4>{employee.role}</h4>

              <p className="company">
                🏢 {employee.company}
              </p>

              <p>
                ⭐ {employee.rating}
              </p>

              <p>
                ⏳ {employee.experience} Years Experience
              </p>

              <div className="skills">

                {employee.skills.map((skill, index) => (

                  <span key={index}>
                    {skill}
                  </span>

                ))}

              </div>

              <div className="employee-buttons">

                <button
                  className="profile-btn"
                  onClick={() =>
                    navigate("/employee-profile", {
                      state: employee,
                    })
                  }
                >
                  View Profile
                </button>

                <button
                  className="invite-btn"
                  onClick={() =>
                    handleInvite(employee._id)
                  }
                >
                  Invite
                </button>

                <button
                  className="meeting-btn"
                  onClick={() =>
                    navigate("/schedule-meeting", {
                      state: employee,
                    })
                  }
                >
                  Schedule Meeting
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Employees;