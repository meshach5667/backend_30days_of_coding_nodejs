const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [];


// Book schema using Joi
const bookSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    publishedYear: Joi.number().integer().min(0).optional(),
    genre: Joi.string().optional()
});



// Route to create a new book
app.post('/books', (req, res) => {
    const { error, value } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const newBook = { id: books.length + 1, ...value };
    books.push(newBook);
    res.status(201).send(newBook);
});

// GET method to retrieve all books
app.get('/books', (req, res) => {
    res.status(200).send(books);
});

// GET method to retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send({ message: 'Book not found' });
    }
});

// PUT method to update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);

    if (index !== -1) {
        // Validate the request body
        if (!req.body.id || !req.body.title || !req.body.author) {
            return res.status(400).send({ message: 'Invalid book details' });
        }

        books[index] = req.body;
        res.status(200).send(books[index]);
    } else {
        res.status(404).send({ message: 'Book not found' });
    }
});

// DELETE method to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Book not found' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ error: 'Bad JSON format' }); // Bad request
    }
    next();
});




app.listen(port, () => {
    console.log(`Book API is running at http://localhost:${port}`);
});
