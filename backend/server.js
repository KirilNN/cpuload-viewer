const express = require('express');
const os = require('os');
var cors = require('cors');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const loadAverage = () => {
  const cpus = os.cpus().length
  const loadAverage = os.loadavg()[0] / cpus

  return { value: loadAverage, date: new Date() };
};

// App
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const response = loadAverage();
  res.end(JSON.stringify(response));
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
