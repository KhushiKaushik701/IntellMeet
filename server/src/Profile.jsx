import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({
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

  // Update Profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/auth/profile",
        {
          bio: profile.bio,
          department: profile.department,
          skills: profile.skills.split(",").map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");
    } catch (error) {
      alert("Failed to Update Profile");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Profile 👤</h1>

      <br />

      <textarea
        rows="4"
        placeholder="Enter Bio"
        value={profile.bio}
        onChange={(e) =>
          setProfile({ ...profile, bio: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Department"
        value={profile.department}
        onChange={(e) =>
          setProfile({
            ...profile,
            department: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Skills (React, Node, MongoDB)"
        value={profile.skills}
        onChange={(e) =>
          setProfile({
            ...profile,
            skills: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={handleSave}>
        Save Profile
      </button>
    </div>
  );
}

export default Profile;