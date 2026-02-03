const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// AI API URL (keyless)
// =====================
const AI_API_URL = "https://feeds-collectors-changelog-promises.trycloudflare.com/run-command"; // உங்கள் API URL

// =====================
// USER MODE MEMORY (IP based)
// =====================
const userModes = {};
const DEFAULT_MODE = 2; // default = Chatbot

// =====================
// MAIN API
// =====================
app.post('/run-command', async (req, res) => {
  const userIP = req.ip;
  const input = (req.body.input || "").trim();

  if (!input) return res.json({ error: "Empty input" });

  // first time user → set default mode
  if (!userModes[userIP]) userModes[userIP] = DEFAULT_MODE;

  // =====================
  // MODE SWITCH
  // =====================
  if (input === "1") {
    userModes[userIP] = 1;
    return res.json({ status: "Mode changed to CMD" });
  }
  if (input === "2") {
    userModes[userIP] = 2;
    return res.json({ status: "Mode changed to CHATBOT" });
  }

  const currentMode = userModes[userIP];

  // =====================
  // MODE 1 → CMD
  // =====================
  if (currentMode === 1) {
    exec(input, (err, stdout, stderr) => {
      if (err) return res.json({ output: err.message });
      const output = stdout || stderr;
      res.json({ output });
    });
  }
  // =====================
  // MODE 2 → CHATBOT
  // =====================
  else if (currentMode === 2) {
    try {
      // Node 18+ fetch
      const aiRes = await fetch(AI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await aiRes.json();

      res.json({ reply: data.reply || data });
    } catch (err) {
      res.json({ error: "AI Server Error" });
    }
  }
});

// =====================
// SERVER START
// =====================
const PORT = 4041;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
