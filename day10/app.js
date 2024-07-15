const express = require('express');
const app = express();
const port = 3000;

const logger = require('/home/meshach/backend_30days_of_coding_nodejs/day10/logger.js');
const errorHandler = require('/home/meshach/backend_30days_of_coding_nodejs/day10/errorHandler.js');

app.use(logger);

app.get('/', (req, res) => {
  res.status(200).send('<h1>GDSC BINGHAM UNIVERSITY</h1>');
});

app.get('/error', (req, res) => {
  throw new Error('they must be an error here.');
});

app.post("/create_user",(req, res) => {
  alert("User Created Successfully")
  res.statusCode(200).send("<h1>User created successfully</h1>")
  console.log(JSON.stringify({first: 'Jane', last: 'Doe'}, null, 2)); 
})
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

