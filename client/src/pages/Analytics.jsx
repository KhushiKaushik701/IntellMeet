import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Analytics.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

function Analytics() {

  const [stats, setStats] = useState({
    upcomingMeetings: 0,
    completedMeetings: 0,
    totalConnections: 0,
    totalNotes: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  const weeklyMeetings = [
    { day: "Mon", meetings: 6 },
    { day: "Tue", meetings: 9 },
    { day: "Wed", meetings: 7 },
    { day: "Thu", meetings: 11 },
    { day: "Fri", meetings: 8 },
    { day: "Sat", meetings: 4 },
    { day: "Sun", meetings: 2 },
  ];

  const departmentData = [
    {
      name: "Development",
      value: 45,
    },
    {
      name: "HR",
      value: 15,
    },
    {
      name: "Client",
      value: 25,
    },
    {
      name: "Internal",
      value: 15,
    },
  ];

  const monthlyProductivity = [
    {
      month: "Jan",
      productivity: 60,
    },
    {
      month: "Feb",
      productivity: 70,
    },
    {
      month: "Mar",
      productivity: 75,
    },
    {
      month: "Apr",
      productivity: 82,
    },
    {
      month: "May",
      productivity: 88,
    },
    {
      month: "Jun",
      productivity: 92,
    },
  ];

  const COLORS = [
    "#4F46E5",
    "#7C3AED",
    "#06B6D4",
    "#F59E0B",
  ];

  return (

    <div className="analytics-page">
    <div className="analytics-header">

  <div>

    <h1>📊 Analytics Dashboard</h1>

    <p>
      Monitor your meetings, AI productivity,
      collaboration and employee engagement.
    </p>

  </div>

  <button className="export-btn">
    Export Report
  </button>

</div>

{/* ================= KPI CARDS ================= */}

<div className="analytics-grid">

  <div className="analytics-card">

    <div className="icon">
      📅
    </div>

    <div>

      <h3>Upcoming Meetings</h3>

      <h1>{stats.upcomingMeetings}</h1>

      <span className="positive">
        +12% this week
      </span>

    </div>

  </div>

  <div className="analytics-card">

    <div className="icon">
      ✅
    </div>

    <div>

      <h3>Completed Meetings</h3>

      <h1>{stats.completedMeetings}</h1>

      <span className="positive">
        +18% this month
      </span>

    </div>

  </div>

  <div className="analytics-card">

    <div className="icon">
      👥
    </div>

    <div>

      <h3>Employees Connected</h3>

      <h1>{stats.totalConnections}</h1>

      <span className="positive">
        Active Team
      </span>

    </div>

  </div>

  <div className="analytics-card">

    <div className="icon">
      🤖
    </div>

    <div>

      <h3>AI Notes Generated</h3>

      <h1>{stats.totalNotes}</h1>

      <span className="positive">
        48 Hours Saved
      </span>

    </div>

  </div>

</div>

{/* ================= PRODUCTIVITY ================= */}

<div className="productivity-wrapper">

  <div className="productivity-card">

    <h2>
      Productivity Score
    </h2>

    <div className="progress">

      <div
        className="progress-fill"
        style={{
          width:"86%"
        }}
      ></div>

    </div>

    <h3>86%</h3>

    <p>
      Overall Team Productivity
    </p>

  </div>

  <div className="productivity-card">

    <h2>
      AI Time Saved
    </h2>

    <h1>
      48 hrs
    </h1>

    <p>
      AI reduced manual meeting work
      significantly this month.
    </p>

  </div>

</div>

{/* ================= CHARTS ================= */}

<div className="charts-grid">
{/* ================= Weekly Meetings ================= */}

<div className="chart-card">

  <h2>📈 Weekly Meetings</h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <LineChart data={weeklyMeetings}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="day" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="meetings"
        stroke="#4F46E5"
        strokeWidth={4}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

{/* ================= Meeting Types ================= */}

<div className="chart-card">

  <h2>🥧 Meeting Categories</h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <PieChart>
      

      <Pie
        data={departmentData}
        dataKey="value"
        outerRadius={100}
        label
      >

        {departmentData.map((entry, index) => (

          <Cell
            key={index}
            fill={COLORS[index]}
          />

        ))}

      </Pie>

      <Legend />

      <Tooltip />

    </PieChart>


  </ResponsiveContainer>

</div>




{/* ================= Monthly Productivity ================= */}

<div className="chart-card full-width">

  <h2>📊 Monthly Productivity</h2>

  <ResponsiveContainer
    width="100%"
    height={320}
  >

    <BarChart
      data={monthlyProductivity}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="productivity"
        fill="#7C3AED"
        radius={[10,10,0,0]}
      />

    </BarChart>

  </ResponsiveContainer>

</div>

{/* ================= Bottom Cards ================= */}

<div className="bottom-grid">

  <div className="bottom-card">

    <h2>🏆 Employee of the Month</h2>

    <img
      src="https://i.pravatar.cc/120"
      alt="Employee"
      className="employee-img"
    />

    <h3>Rahul Sharma</h3>

    <p>Senior Software Engineer</p>

    <span>⭐ 97% Productivity</span>

  </div>

  <div className="bottom-card">

    <h2>🤖 AI Performance</h2>

    <h1>96%</h1>

    <p>
      AI summaries generated successfully
      with excellent accuracy.
    </p>

    <ul>

      <li>✔ 215 AI Notes</li>

      <li>✔ 48 Hours Saved</li>

      <li>✔ 182 Action Items</li>

    </ul>

  </div>

</div>

{/* ================= Recent Activities ================= */}

<div className="activity-card">

  <h2>📌 Recent Activities</h2>

  <ul>

    <li>✅ Rahul scheduled a Project Review meeting.</li>

    <li>🤖 AI generated a meeting summary.</li>

    <li>👥 Priya joined Development Team.</li>

    <li>📅 Sprint Planning completed successfully.</li>

    <li>🎯 24 action items assigned automatically.</li>

  </ul>

</div>
</div>
</div>
);
}
export default Analytics;
