import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          🚀 IntellMeet
        </div>

        <ul>

          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <a href="#stats">Analytics</a>
          </li>

          <li>
            <a href="#about">About</a>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>

            <Link className="register-btn" to="/register">

              Get Started

            </Link>

          </li>

        </ul>

      </nav>

      {/* Hero */}

      <section className="hero-home">

        <div className="hero-left">

          <h1>

            AI Powered Enterprise
            <br />
            Collaboration Platform

          </h1>

          <p>

            Conduct smarter meetings, generate AI summaries,
            assign action items and collaborate with your team —
            all in one platform.

          </p>

          <div className="hero-buttons">

            <Link
              className="primary-btn"
              to="/register"
            >
              Get Started
            </Link>

            <Link
              className="secondary-btn"
              to="/login"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="hero-right">

          <div className="dashboard-preview">

            <div className="preview-header">

              <div className="dot red"></div>

              <div className="dot yellow"></div>

              <div className="dot green"></div>

            </div>

            <div className="preview-content">

              <div className="preview-card">
                📅 Meetings
              </div>

              <div className="preview-card">
                🤖 AI Summary
              </div>

              <div className="preview-card">
                📊 Analytics
              </div>

              <div className="preview-card">
                👥 Employees
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Companies */}

      <section className="companies">

        <h3>Trusted by Modern Teams</h3>

        <div className="company-list">

          <span>Microsoft</span>

          <span>Google</span>

          <span>Amazon</span>

          <span>Zidio</span>

          <span>Infosys</span>

        </div>

      </section>
            {/* Features */}

      <section
        id="features"
        className="features-section"
      >

        <h2>Everything You Need</h2>

        <p>
          Built for modern enterprise teams.
        </p>

        <div className="feature-grid">

          <div className="feature-card">

            <h3>🤖 AI Meeting Intelligence</h3>

            <p>

              Generate AI summaries, transcripts,
              meeting notes and action items
              automatically.

            </p>

          </div>

          <div className="feature-card">

            <h3>📅 Smart Meeting Scheduler</h3>

            <p>

              Schedule meetings with teammates
              effortlessly.

            </p>

          </div>

          <div className="feature-card">

            <h3>👥 Employee Directory</h3>

            <p>

              Discover employees, mentors,
              managers and connect instantly.

            </p>

          </div>

          <div className="feature-card">

            <h3>📊 Analytics Dashboard</h3>

            <p>

              Visualize productivity,
              meetings and engagement.

            </p>

          </div>

          <div className="feature-card">

            <h3>🔒 Enterprise Security</h3>

            <p>

              Secure authentication,
              JWT authorization and protected APIs.

            </p>

          </div>

          <div className="feature-card">

            <h3>⚡ Real-Time Collaboration</h3>

            <p>

              Connect your teams
              in one collaborative workspace.

            </p>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section
        id="stats"
        className="stats-section"
      >

        <div className="stat-box">

          <h1>10K+</h1>

          <p>Meetings Conducted</p>

        </div>

        <div className="stat-box">

          <h1>500+</h1>

          <p>Enterprise Teams</p>

        </div>

        <div className="stat-box">

          <h1>99.9%</h1>

          <p>Platform Uptime</p>

        </div>

        <div className="stat-box">

          <h1>AI</h1>

          <p>Powered Platform</p>

        </div>

      </section>

      {/* About */}

      <section
        id="about"
        className="about-section"
      >

        <h2>Why IntellMeet?</h2>

        <p>

          IntellMeet transforms traditional meetings
          into intelligent collaboration experiences.
          From AI-generated summaries to employee
          networking and analytics, everything is
          available in one enterprise platform.

        </p>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <h2>

          Ready to Transform Your Meetings?

        </h2>

        <p>

          Join thousands of professionals using
          IntellMeet every day.

        </p>

        <Link
          to="/register"
          className="primary-btn"
        >
          Start Free
        </Link>

      </section>

      {/* Footer */}

      <footer className="footer">

        <div>

          <h2>🚀 IntellMeet</h2>

          <p>

            Enterprise AI Collaboration Platform

          </p>

        </div>

        <div>

          <h4>Quick Links</h4>

          <p>Home</p>

          <p>Features</p>

          <p>Analytics</p>

          <p>Contact</p>

        </div>

        <div>

          <h4>Company</h4>

          <p>Privacy</p>

          <p>Terms</p>

          <p>Support</p>

        </div>

      </footer>

    </div>

  );

}

export default Home;