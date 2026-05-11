const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

let count = 0;

app.get('/', (req, res) => {
  res.send(`
    <body style="font-family:sans-serif;text-align:center;padding-top:50px;">
      <h1>🚀 DevOps CI/CD Demo App</h1>
      <h2>Visitor Count: ${count}</h2>

      <form action="/visit" method="POST">
        <button style="padding:10px 20px;font-size:18px;">
          Visit Site
        </button>
      </form>

      <br>

      <form action="/reset" method="POST">
        <button style="padding:10px 20px;font-size:18px;background:red;color:white;">
          Reset Counter
        </button>
      </form>
    </body>
  `);
});

app.post('/visit', (req, res) => {
  count++;
  res.redirect('/');
});

app.post('/reset', (req, res) => {
  count = 0;
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});