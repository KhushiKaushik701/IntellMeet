import "./MentorProfile.css";

import { useLocation, useNavigate } from "react-router-dom";

function MentorProfile() {
    const navigate = useNavigate();
const location = useLocation();
const mentor = location.state;
if (!mentor) {
  return <h2>No Mentor Selected</h2>;
}

  return (
    <div className="profile-page">

      <div className="profile-card">

        <img
          src={mentor.image}
          alt="mentor"
        />

        <h1>{mentor.name}</h1>

    <h3>{mentor.role}</h3>

        <p>🏢 {mentor.company}</p>

        <p>⭐ {mentor.rating}</p>

        <p>💼 Experience : {mentor.experience} Years</p>

       <div className="skills">
  {mentor.skills.map((skill, index) => (
    <span key={index}>{skill}</span>
  ))}
</div>

        <h2>About</h2>

        <p className="bio">
          Passionate Full Stack Developer helping students crack
          product-based companies through MERN Stack, DSA and
          System Design.
        </p>

        <button className="connect-btn">
          Connect
        </button>
        <button
  className="meeting-btn"
  onClick={() => navigate("/book-meeting",{
    state:mentor,
  })}
>
  📅 Book Meeting
</button>

      </div>

    </div>
  );
}

export default MentorProfile;