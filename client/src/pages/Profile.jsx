import { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    department: "",
    skills: "",
  });

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile({
          name: response.data.user.name || "",
          email: response.data.user.email || "",
          bio: response.data.user.bio || "",
          department: response.data.user.department || "",
          skills: response.data.user.skills
            ? response.data.user.skills.join(", ")
            : "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  // Save Profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/auth/profile",
        {
          bio: profile.bio,
          department: profile.department,
          skills: profile.skills
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully ✅");
    } catch (error) {
      alert("Failed to Update Profile ❌");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h1>👤 My Profile</h1>

        <label>Name</label>
        <input
          type="text"
          value={profile.name}
          readOnly
        />

        <label>Email</label>
        <input
          type="email"
          value={profile.email}
          readOnly
        />

        <label>Bio</label>
        <textarea
          rows="4"
          placeholder="Tell something about yourself..."
          value={profile.bio}
          onChange={(e) =>
            setProfile({
              ...profile,
              bio: e.target.value,
            })
          }
        ></textarea>

        <label>Department</label>
        <input
          type="text"
          placeholder="Computer Science"
          value={profile.department}
          onChange={(e) =>
            setProfile({
              ...profile,
              department: e.target.value,
            })
          }
        />

        <label>Skills</label>
        <input
          type="text"
          placeholder="React, Node.js, MongoDB"
          value={profile.skills}
          onChange={(e) =>
            setProfile({
              ...profile,
              skills: e.target.value,
            })
          }
        />

        <button onClick={handleSave}>
          Save Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;