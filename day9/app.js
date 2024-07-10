const express = require('express');
const app = express();
const port = 3000;

// Route for getting a book based on query parameters
app.get('/get_book', (req, res) => {
    const term = req.query.term;
    const sort = req.query.sort;
    res.send(`Finding book: ${term}, Sorting book by: ${sort}`);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
