const express = require('express');
const os = require('os');
const app = express();

app.use(express.urlencoded({ extended: true }));

let visits = 0;
let logs = [];
const startTime = new Date();

function logAction(action) {
  logs.unshift({
    action,
    time: new Date().toLocaleTimeString()
  });

  if (logs.length > 5) logs.pop();
}

app.get('/', (req, res) => {
  res.send(`
  <html>
  <head>
    <title>DevOps Dashboard</title>

    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f4f4f4;
        margin: 0;
        padding: 40px;
        text-align: center;
      }

      .container {
        max-width: 700px;
        margin: auto;
      }

      .card {
        background: white;
        padding: 20px;
        margin-top: 20px;
        border-radius: 8px;
        border: 1px solid #ccc;
      }

      h1, h2, h3 {
        margin-bottom: 15px;
      }

      button {
        padding: 10px 18px;
        margin: 8px;
        border: 1px solid #999;
        background: white;
        cursor: pointer;
        border-radius: 5px;
      }

      button:hover {
        background: #eaeaea;
      }

      p {
        margin: 8px 0;
      }

      .logs {
        text-align: left;
      }
    </style>
  </head>

  <body>

    <div class="container">

      <h1>DevOps CI/CD Dashboard</h1>

      <div class="card">
        <h2>Application Status</h2>

        <p><strong>Server Status:</strong> Running</p>
        <p><strong>Total Visits:</strong> ${visits}</p>
        <p><strong>Hostname:</strong> ${os.hostname()}</p>
        <p><strong>Platform:</strong> ${os.platform()}</p>
        <p><strong>Uptime:</strong> ${Math.floor(process.uptime())} seconds</p>
        <p><strong>Started At:</strong> ${startTime.toLocaleTimeString()}</p>
      </div>

      <div class="card">

        <form action="/visit" method="POST">
          <button type="submit">Increase Visits</button>
        </form>

        <form action="/reset" method="POST">
          <button type="submit">Reset Counter</button>
        </form>

        <form action="/" method="GET">
          <button type="submit">Refresh Dashboard</button>
        </form>

      </div>

      <div class="card logs">
        <h3>Recent Activity Logs</h3>

        ${
          logs.length
            ? logs.map(log => `<p>${log.time} - ${log.action}</p>`).join('')
            : '<p>No activity available.</p>'
        }

      </div>

    </div>

  </body>
  </html>
  `);
});

app.post('/visit', (req, res) => {
  visits++;
  logAction('Visitor count increased');
  res.redirect('/');
});

app.post('/reset', (req, res) => {
  visits = 0;
  logAction('Counter reset');
  res.redirect('/');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'Running',
    uptime: process.uptime(),
    visits
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});