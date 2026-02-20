const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// =====================
// AI API URLS
// =====================

// MODE 2 → AI API
const AI_API_URL = "https://chrome-cancelled-animals-seeks.trycloudflare.com/run-command";

// MODE 3 → NEW AI API
const AI_API_URL_MODE3 = "https://contributor-geological-proved-donation.trycloudflare.com/run-command";

// MODE 4 → NEW AI API #3  (🔴 CHANGE THIS URL)
const AI_API_URL_MODE4 = "https://your-new-api-url.trycloudflare.com/run-command";


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
    return res.json({ status: "Mode changed to Samsung mobile" });
  }

  if (command === "4") {
    userModes[userIP] = 4;
    return res.json({ status: "Mode changed to hugging face ubentu" });
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

  // =====================
  // MODE 4 → AI API #3
  // =====================
  else if (currentMode === 4) {
    try {
      const aiRes = await fetch(AI_API_URL_MODE4, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
      });

      const data = await aiRes.json();
      res.json({ reply: data.reply || data });

    } catch (err) {
      res.json({ error: "AI Server Error (Mode 4)" });
    }
  }

});


// =====================
// SERVER START
// =====================
const PORT = process.env.PORT || 4041;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});    userModes[userIP] = DEFAULT_MODE;
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
    return res.json({ status: "Mode changed to Samsung mobile" });
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
