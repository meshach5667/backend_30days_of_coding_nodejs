const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } = require("firebase/firestore");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR5GBfx6gs4lnrnmefZ2jI8JFyZQnBicE",
  authDomain: "backendnodejs-a6813.firebaseapp.com",
  projectId: "backendnodejs-a6813",
  storageBucket: "backendnodejs-a6813.appspot.com",
  messagingSenderId: "837533147666",
  appId: "1:837533147666:web:64e4b04bc42672e3b52ecb",
  measurementId: "G-QMXPCXTP8P"
};

// Firebase Admin SDK configuration (serviceAccount.json)
const serviceAccount = require("/home/meshach/backend_30days_of_coding_nodejs/day17/serviceAccount.json");

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);
const booksCollection = collection(db, "Books");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://backendnodejs-a6813.firebaseio.com"
});

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Middleware to verify Firebase ID token
const authenticate = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).send({ error: 'Unauthorized' });
  }
};

// User registration schema using Joi
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().min(3).required()
});

// Route to register a new user
app.post('/register', async (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const { email, password, displayName } = value;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName
    });

    res.status(201).send({ uid: userRecord.uid, email: userRecord.email, displayName: userRecord.displayName });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send({ error: 'Failed to create user' });
  }
});

// Book schema using Joi
const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  publishedYear: Joi.number().integer().min(0).optional(),
  genre: Joi.string().optional()
});

// Route to create a new book
app.post('/books', authenticate, async (req, res) => {
  const { error, value } = bookSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  try {
    const docRef = await addDoc(booksCollection, value);
    res.status(201).send({ id: docRef.id, ...value });
  } catch (err) {
    res.status(500).send({ error: 'Failed to add book' });
  }
});

// GET method to retrieve all books
app.get('/books', async (req, res) => {
  try {
    const snapshot = await getDocs(booksCollection);
    const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch books' });
  }
});

// GET method to retrieve a specific book by ID
app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const bookDoc = await getDoc(doc(db, "Books", bookId));
    if (bookDoc.exists()) {
      res.status(200).send({ id: bookDoc.id, ...bookDoc.data() });
    } else {
      res.status(404).send({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch book' });
  }
});

// PUT method to update a book by ID
app.put('/books/:id', authenticate, async (req, res) => {
  const bookId = req.params.id;
  const { error, value } = bookSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  try {
    const bookDoc = doc(db, "Books", bookId);
    await updateDoc(bookDoc, value);
    res.status(200).send({ id: bookId, ...value });
  } catch (err) {
    res.status(500).send({ error: 'Failed to update book' });
  }
});

// DELETE method to delete a book by ID
app.delete('/books/:id', authenticate, async (req, res) => {
  const bookId = req.params.id;

  try {
    const bookDoc = doc(db, "Books", bookId);
    await deleteDoc(bookDoc);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete book' });
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
