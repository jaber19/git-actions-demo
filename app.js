const express = require('express');

const app = express();
app.use(express.json());
const podName = process.env.POD_NAME;
var ready = true;


app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Both inputs must be numbers' });
  }

  const result = num1 + num2;
  res.json({ result });
});


app.get('/make-unready', (req, res) => {
  ready = false; // Simulate temporary unavailability
  setTimeout(() => {
    ready = true; // Become ready again after 20 seconds
  }, 20000);
  res.send(`Pod ${podName} marked as unready`);
});

app.get('/loop', (req, res) => {
  
  res.send(`Pod ${podName} going into infinite loop...`);

  while(true){}
});

app.get('/liveness', (req,res)=> {

  res.send('Alive!')
});

app.get('/readiness', (req,res)=> {
  if (ready) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('Not Ready');
  }
});




const server = app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

module.exports = {app, server};
