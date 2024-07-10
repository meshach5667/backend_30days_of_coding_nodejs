const express = require('express');
const app = express();
const port = 3000;

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Use custom logging middleware
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/error', (req, res) => {
  throw new Error('This is a forced error.');
});

// Use custom error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

