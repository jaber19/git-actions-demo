const express = require('express');

const app = express();

const podName = process.env.POD_NAME;
var ready = true;

app.get('/', (req, res) => {
  console.log(`Pod ${podName} is executing normal get req.`);
  res.send(`
    <h1>Hello from this NodeJS app!!!!!!</h1>
  `);
});

app.get('/error', (req, res) => {
  console.log(`Pod ${podName} is executing the error process.exit.`);
  process.exit(1);
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




app.listen(8080);
