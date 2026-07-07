import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Settings.css";

function Settings() {

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async () => {

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await API.put(
        "/auth/change-password",
        passwords,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password Updated Successfully ✅");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.log(error);
      alert("Unable to change password");
    }
  };

  return (

    <div className="settings-page">

      <h1>⚙ Account Settings</h1>

      <div className="profile-box">

        <h2>Profile Information</h2>

        <p>
          <strong>Name :</strong> {user.name}
        </p>

        <p>
          <strong>Email :</strong> {user.email}
        </p>

      </div>

      <div className="password-box">

        <h2>🔒 Change Password</h2>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />

        <button onClick={changePassword}>
          Update Password
        </button>

      </div>

    </div>

  );
}

export default Settings;