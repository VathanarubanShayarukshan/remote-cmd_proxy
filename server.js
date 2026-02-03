const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// =====================
// AI API URL
// =====================
const AI_API_URL = "https://feeds-collectors-changelog-promises.trycloudflare.com/run-command";

// =====================
// USER MODE MEMORY
// =====================
const userModes = {};
const DEFAULT_MODE = 2; // Chatbot

// =====================
// MAIN API
// =====================
app.post('/run-command', async (req, res) => {
  const userIP = req.ip;
  const input = (req.body.input || "").trim();

  if (!input) return res.json({ error: "Empty input" });

  if (!userModes[userIP]) userModes[userIP] = DEFAULT_MODE;

  // MODE SWITCH
  if (input === "1") {
    userModes[userIP] = 1;
    return res.json({ status: "Mode changed to CMD" });
  }

  if (input === "2") {
    userModes[userIP] = 2;
    return res.json({ status: "Mode changed to CHATBOT" });
  }

  const currentMode = userModes[userIP];

  if (currentMode === 1) {
    exec(input, (err, stdout, stderr) => {
      if (err) return res.json({ output: err.message });
      const output = stdout || stderr;
      res.json({ output });
    });
  } else if (currentMode === 2) {
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
const PORT = process.env.PORT || 4041;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
