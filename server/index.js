const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.get('/hello', (req, res) => {
  console.log(`Received request: ${req.url}`);
  res.json({ message: 'hello-world' });
});

app.get('/', (req, res) => {
  console.log(`Received request: ${req.url}`);
  res.json({ message: 'Welcome to Undercut!' });
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
