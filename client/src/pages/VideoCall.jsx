import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import ChatBox from "../components/ChatBox";
import socket from "../services/socket";
import API from "../services/api";
import "./VideoCall.css";

function VideoCall() {
  const meetingRef = useRef(null);
  const recognitionRef = useRef(null);

  const location = useLocation();

  const roomID = location.state?.roomID || "IntellMeetRoom";

  const [transcript, setTranscript] = useState("");

  // ================= Save Speech to Chat =================

  const saveTranscript = async (text) => {
    if (!text.trim()) return;

    const chatData = {
      roomID,
      sender: "You 🎤",
      message: text,
    };

    socket.emit("send-message", chatData);

    try {
      await API.post("/chat", chatData);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= Speech Recognition =================

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);

      if (event.results[event.results.length - 1].isFinal) {
        await saveTranscript(text);
      }
    };

    recognition.onerror = (event) => {
      console.log("Speech Error:", event.error);
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // ================= Zego Video Call =================

  useEffect(() => {
    const myMeeting = async () => {

      const appID = 1009625084;

      const serverSecret = "ffd52d4338bc9e57db8712042a5a5dcf";

      const userID = String(Date.now());

      const userName = "User-" + userID;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingRef.current,

        sharedLinks: [
          {
            name: "Meeting Link",
            url: window.location.href,
          },
        ],

        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },

        showScreenSharingButton: true,
      });
    };

    myMeeting();
  }, [roomID]);

  return (
    <div className="video-page">

      <div className="video-section">

        <div
          ref={meetingRef}
          className="video-container"
        />

      </div>

      {/* Speech Recognition */}

      <div
        style={{
          width: "330px",
          padding: "20px",
          background: "#fff",
          borderLeft: "1px solid #ddd",
        }}
      >
        <button
          onClick={startListening}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          🎤 Start Listening
        </button>

        <button
          onClick={stopListening}
          style={{
            width: "100%",
            padding: "12px",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⏹ Stop Listening
        </button>

        <h3 style={{ marginTop: "20px" }}>
          Live Transcript
        </h3>

        <div
          style={{
            minHeight: "220px",
            background: "#f5f5f5",
            borderRadius: "8px",
            padding: "10px",
            marginTop: "10px",
            whiteSpace: "pre-wrap",
            overflowY: "auto",
          }}
        >
          {transcript || "Start Speaking..."}
        </div>
      </div>

      <ChatBox roomID={roomID} />

    </div>
  );
}

export default VideoCall;