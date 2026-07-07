import { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import API from "../services/api";
import "./MeetingSummary.css";

function MeetingSummary() {
  const location = useLocation();

  const roomID = location.state?.roomID;

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/summary",
        {
          roomID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummary(res.data.summary);
    } catch (err) {
      console.log(err);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!summary) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("IntellMeet AI Meeting Summary", 20, 20);

    doc.setFontSize(12);

    const lines = doc.splitTextToSize(summary, 170);

    doc.text(lines, 20, 40);

    doc.save("MeetingSummary.pdf");
  };

  return (
    <div className="summary-page">
      <h1>🤖 AI Meeting Summary</h1>

      <button onClick={generateSummary}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <>
          <div className="summary-box">
            <pre>{summary}</pre>
          </div>

          <button
            onClick={downloadPDF}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            📄 Download PDF
          </button>
        </>
      )}
    </div>
  );
}

export default MeetingSummary;