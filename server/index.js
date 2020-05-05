const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser());

app.get('/hello', (req, res) => {
  console.log(`Received request: ${req.url}`);
  res.json({ message: 'hello-world' });
});
