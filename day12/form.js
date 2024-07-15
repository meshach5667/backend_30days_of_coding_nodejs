const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;


    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);

    res.send(`<p>Form submitted successfully!</p><p>Name: ${name}</p><p>Email: ${email}</p>`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
