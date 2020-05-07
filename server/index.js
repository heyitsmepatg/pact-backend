require('dotenv').config();
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

app.post('/message', async (req, res) => {
  console.log(`Posting data.... ${req.body.message}`);
  console.log(JSON.stringify(req.body));
  const message = {
    title: req.body.message,
  };
  const firestoreResponse = await firestore.collection('Messages').add(message);
  console.log(`Firestore Response is: ${firestoreResponse}`);
  res.json(firestoreResponse);
});

app.get('/messages', async (req, res) => {
  try {
    const messagesSnapshot = await firestore.collection('Messages').get();
    const messagesReturn = { messages: [] };
    if (!messagesSnapshot.empty) {
      messagesSnapshot.docs.forEach((message) => {
        messagesReturn.messages.push(message.data());
      });
      res.json(messagesReturn);
    } else {
      messagesReturn.messages.push('No messages found');
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
