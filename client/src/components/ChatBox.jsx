import { useEffect, useState } from "react";
import socket from "../services/socket";
import API from "../services/api";
import "./ChatBox.css";

function ChatBox({ roomID }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/chat/${roomID}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();

    socket.emit("join-room", roomID);

    const receiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive-message", receiveMessage);

    return () => {
      socket.off("receive-message", receiveMessage);
    };
  }, [roomID]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const chatData = {
      roomID,
      sender: "You",
      message,
    };

    socket.emit("send-message", chatData);

    try {
      await API.post("/chat", chatData);
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>💬 Live Chat</h2>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}</strong>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;