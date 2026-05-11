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
        background: #111827;
        color: white;
        font-family: Arial;
        text-align: center;
        padding: 30px;
      }

      .card {
        background: #1f2937;
        width: 400px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.4);
      }

      button {
        padding: 12px 18px;
        margin: 10px;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
      }

      .visit {
        background: #22c55e;
        color: white;
      }

      .reset {
        background: #ef4444;
        color: white;
      }

      .refresh {
        background: #3b82f6;
        color: white;
      }
    </style>
  </head>

  <body>

    <h1>DevOps CI/CD Dashboard</h1>

    <div class="card">
      <h2>Total Visits: ${visits}</h2>
      <p>Server Status: ✅ Running</p>
      <p>Hostname: ${os.hostname()}</p>
      <p>Platform: ${os.platform()}</p>
      <p>Uptime: ${Math.floor(process.uptime())} seconds</p>
      <p>Started At: ${startTime.toLocaleTimeString()}</p>
    </div>

    <form action="/visit" method="POST">
      <button class="visit">Increase Visits</button>
    </form>

    <form action="/reset" method="POST">
      <button class="reset">Reset Counter</button>
    </form>

    <form action="/" method="GET">
      <button class="refresh">Refresh Dashboard</button>
    </form>

    <div class="card">
      <h3>Recent Activity Logs</h3>
      ${logs.map(log => `<p>${log.time} → ${log.action}</p>`).join('') || '<p>No logs yet</p>'}
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
  console.log('🚀 DevOps Dashboard running on port 3000');
});