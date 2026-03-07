import { useState, useContext } from "react";
import { SustainabilityContext } from "../context/SustainabilityContext";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../api";
import "./Assistant.css";

function Assistant() {

  const { scores } = useContext(SustainabilityContext);
  const { currentUser } = useAuth();

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Ask me about your sustainability performance.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {

    if (!input.trim() || !currentUser) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages(prev => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {

      // Firebase Token
      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${API_BASE_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: userMessage.text,
            scores,
          }),
        }
      );

      if (!response.ok) {

        const errorData = await response.json();

        throw new Error(
          errorData.reply || `Server error: ${response.status}`
        );

      }

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: data.reply || "No response",
        },
      ]);

    } catch (error) {

      console.error("Chat error:", error);

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: `⚠️ Error: ${error.message}`,
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="assistantContainer">

      <div className="chatBox">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={
              msg.sender === "user"
                ? "userMsg"
                : "aiMsg"
            }
          >
            {msg.text}
          </div>

        ))}

        {loading && (
          <div className="aiMsg">
            Thinking... 🌱
          </div>
        )}

      </div>

      <div className="inputArea">

        <input
          type="text"
          placeholder="Ask about your sustainability..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !loading &&
            handleSend()
          }
        />

        <button
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>

  );

}

export default Assistant;