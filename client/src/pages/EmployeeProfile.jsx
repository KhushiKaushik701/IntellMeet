import { useLocation, useNavigate } from "react-router-dom";
import "../styles/EmployeeProfile.css";

function EmployeeProfile() {

  const location = useLocation();
  const navigate = useNavigate();

  const employee = location.state;

  if (!employee) {
    return (
      <div className="employee-profile">
        <h2>Employee Not Found</h2>
      </div>
    );
  }

  return (

    <div className="employee-profile">

      <div className="profile-card">

        <img
          src={employee.image}
          alt={employee.name}
        />

        <h1>{employee.name}</h1>

        <h3>{employee.role}</h3>

        <p>🏢 {employee.company}</p>

        <p>⭐ {employee.rating}</p>

        <p>⏳ {employee.experience} Years Experience</p>

        <div className="skills">

          {employee.skills.map((skill,index)=>(
            <span key={index}>
              {skill}
            </span>
          ))}

        </div>

        <button
          className="meeting-btn"
          onClick={() =>
            navigate("/book-meeting",{
              state:employee
            })
          }
        >
          📅 Schedule Meeting
        </button>

      </div>

    </div>

  );

}

export default EmployeeProfile;