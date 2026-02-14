const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// =====================
// AI API URLS
// =====================
// MODE 2 → AI API
const AI_API_URL = "https://widescreen-descriptions-travelers-metro.trycloudflare.com/run-command";

// MODE 3 → NEW AI API
const AI_API_URL_MODE3 = "https://campaign-bedroom-indicates-dat.trycloudflare.com/run-command";

// =====================
// USER MODE MEMORY (IP based)
// =====================
const userModes = {};
const DEFAULT_MODE = 2; // default = Mode 2 (AI)

// =====================
// MAIN API
// =====================
app.post('/run-command', async (req, res) => {
  const userIP = req.ip;

  // 🔹 single key for all modes
  const command = (req.body.command || "").trim();

  if (!command) {
    return res.json({ error: "Empty command" });
  }

  // First-time user
  if (!userModes[userIP]) {
    userModes[userIP] = DEFAULT_MODE;
  }

  // =====================
  // MODE SWITCH
  // =====================
  if (command === "1") {
    userModes[userIP] = 1;
    return res.json({ status: "Mode changed to CMD mode" });
  }

  if (command === "2") {
    userModes[userIP] = 2;
    return res.json({ status: "Mode changed to termux" });
  }

  if (command === "3") {
    userModes[userIP] = 3;
    return res.json({ status: "Mode changed to Google Cloud Shell Linux" });
  }

  const currentMode = userModes[userIP];

  // =====================
  // MODE 1 → SERVER CMD
  // =====================
  if (currentMode === 1) {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        return res.json({ output: err.message });
      }
      res.json({ output: stdout || stderr });
    });
  }

  // =====================
  // MODE 2 → AI API #1
  // =====================
  else if (currentMode === 2) {
    try {
      const aiRes = await fetch(AI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
      });

      const data = await aiRes.json();
      res.json({ reply: data.reply || data });

    } catch (err) {
      res.json({ error: "AI Server Error (Mode 2)" });
    }
  }

  // =====================
  // MODE 3 → AI API #2
  // =====================
  else if (currentMode === 3) {
    try {
      const aiRes = await fetch(AI_API_URL_MODE3, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
      });

      const data = await aiRes.json();
      res.json({ reply: data.reply || data });

    } catch (err) {
      res.json({ error: "AI Server Error (Mode 3)" });
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
