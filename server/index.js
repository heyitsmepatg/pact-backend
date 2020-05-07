const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Firestore = require('@google-cloud/firestore');

const app = express();

// Config
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Received request: ${req.url}`);
  next();
});

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const firestore = new Firestore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

app.get('/hello', (req, res) => {
  res.json({ message: 'hello-world' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Undercut!' });
});

app.post('/message', (req, res) => {
  console.log(`Posting data.... ${req.body}`);
  const message = 'successfully saved data';

  res.send(message);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
