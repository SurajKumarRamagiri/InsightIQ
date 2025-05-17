import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";

export default function ChatPage({ darkMode, setDarkMode }) {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [previousChats, setPreviousChats] = useState([
    { id: 1, title: "Chat with Docs 1" },
    { id: 2, title: "Chat with Docs 2" },
    { id: 3, title: "Chat with Docs 3" }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const aiMessage = { role: "ai", content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "ai",
        content: "Sorry, there was an error processing your message.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div style={{ flex: 1, padding: "20px", maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "10px", backgroundColor: darkMode ? '#343a40' : 'white' }}>
        <header style={{ padding: "10px 20px", borderBottom: "1px solid #e0e0e0", fontWeight: "600", fontSize: "1.5rem", color: darkMode ? '#f8f9fa' : '#333' }}>
          Modern Chat Interface
        </header>
        <main style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#007bff" : "#e1e1e1",
                color: msg.role === "user" ? "white" : "#333",
                padding: "12px 18px",
                borderRadius: "20px",
                maxWidth: "75%",
                whiteSpace: "pre-wrap",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>
        <form onSubmit={sendMessage} style={{ display: "flex", padding: "15px 20px", borderTop: "1px solid #e0e0e0" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "12px 15px",
              fontSize: "16px",
              borderRadius: "25px",
              border: "1px solid #ccc",
              outline: "none",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <button
            type="submit"
            style={{
              marginLeft: "15px",
              padding: "12px 25px",
              fontSize: "16px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,123,255,0.4)",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Send
          </button>
        </form>
      </div>
      <div style={{ width: "250px", borderLeft: "1px solid #ddd", backgroundColor: darkMode ? '#212529' : '#fff', padding: "20px", overflowY: "auto" }}>
        <h3 style={{ marginBottom: "15px", fontWeight: "600", color: darkMode ? '#f8f9fa' : '#333' }}>Previous Chats</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {previousChats.map((chat) => (
            <li key={chat.id} style={{ padding: "10px", borderBottom: "1px solid #eee", cursor: "pointer", color: "#007bff" }}>
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
