const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('<h1>Heyyy, my home page!!!</h1>');
});


app.get('/about', (req, res) => {
  res.send('<h1>I am Obed Meshach. This is my about me page</h1>');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
