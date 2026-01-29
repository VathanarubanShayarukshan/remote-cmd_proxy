
const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

// Serve the HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.post('/run-command', (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'No command provided' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.json({ error: error.message, stderr });
    }
    res.json({ output: stdout || stderr });
  });
});

const PORT = 4040;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
