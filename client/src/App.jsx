import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Employees from "./pages/Employees";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import MyMeetings from "./pages/MyMeetings";
import MeetingSummary from "./pages/MeetingSummary";
import MeetingHistory from "./pages/MeetingHistory";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import VideoCall from "./pages/VideoCall";
import Teams from "./pages/Teams";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/schedule-meeting" element={<ScheduleMeeting />} />

        <Route path="/my-meetings" element={<MyMeetings />} />
        
  <Route path="/analytics" element={<Analytics />} />


        <Route
          path="/meeting-summary"
          element={<MeetingSummary />}
        />

        <Route
          path="/meeting-history"
          element={<MeetingHistory />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/video-call"
          element={<VideoCall />}
        />

        <Route
    path="/teams"
    element={<Teams />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;