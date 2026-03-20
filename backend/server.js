import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// ====== PORT ======
const PORT = process.env.PORT || 5000;

// ====== ENV ======
const API_KEY = process.env.GEMINI_API_KEY;

// ====== DB CONNECT ======
connectDB()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err.message));

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("SustainAI Backend Running 🚀");
});

// ===== CHAT (AI ASSISTANT) =====
app.post("/chat", async (req, res) => {

  try {

    if (!API_KEY) {
      return res.status(500).json({
        reply: "Gemini API key missing on server"
      });
    }

    const { message, scores } = req.body;

    if (!message)
      return res.status(400).json({
        reply: "Message required"
      });

    const prompt = `
You are a sustainability AI assistant.

Composite: ${scores?.composite ?? "N/A"}
Carbon: ${scores?.carbon ?? "N/A"}
Water: ${scores?.water ?? "N/A"}
Energy: ${scores?.energy ?? "N/A"}
Waste: ${scores?.waste ?? "N/A"}
Lifestyle: ${scores?.lifestyle ?? "N/A"}

User Question:
${message}

Give concise sustainability advice.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });

  } catch (error) {

    console.error("Chat Error:", error);

    res.status(500).json({
      reply: "Server Error",
      error: error.message
    });

  }

});

// ===== GLOBAL ERROR SAFETY =====

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});