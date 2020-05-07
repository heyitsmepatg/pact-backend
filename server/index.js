const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Constants
const PORT = process.env.PORT || 8082;
const HOST = process.env.HOST || '0.0.0.0';

// bring in firestore
const Firestore = require("@google-cloud/firestore");

// initialize Firestore and set project id from env var
const firestore = new Firestore(
    {
        projectId: process.env.GOOGLE_CLOUD_PROJECT
    }
);
app.post('/message', (req, res) => {
    // create a new object from the json data and add an id
    const ev = { 
        message: req.body.title
     }
// this will create the Messages collection if it does not exist
    firestore.collection("Messages").add(ev).then(ret => {
        getMessages(req, res);
    });
});
function getMessages(req, res) {
    firestore.collection("Messages").get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                const ret = { Messages: []};
                snapshot.docs.forEach(element => {
                    ret.Messages.push(element.data());
                }, this);
                console.log(ret);
                res.json(ret);
            } else {
                 res.json({ message: 'ERROR: No Messages' });
            }
        })
        .catch((err) => {
            console.error('Error getting Messages', err);
            res.json({ message: 'ERROR: unable to retrieve messages' });
        });
};
app.get('/Messages', (req, res) => {
    getMessages(req, res);
});



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
