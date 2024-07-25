const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const JWT_SECRET = 'ecae8c5db0e1fb2f1d4d9ea4e478e9462c3d9a3bf2b1eab8e5f857d91e9ab8e4';

// Middleware for verifying tokens
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.uid;
    next();
  });
};

// Registration route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).send({ uid: userRecord.uid, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWSd9VXgCpaT4_XtTnnoznVllp9beueiE`, {
      email,
      password,
      returnSecureToken: true,
    });

    // Generate JWT token
    const token = jwt.sign({ uid: response.data.localId }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({
      idToken: response.data.idToken,
      refreshToken: response.data.refreshToken,
      jwtToken: token,
    });
  } catch (error) {
    res.status(400).send({ error: error.response.data.error.message });
  }
});


app.get('/protected', verifyToken, (req, res) => {
  res.status(200).send({ message: 'This is a protected route', userId: req.userId });
});


const items = {};

// Create item route (protected)
app.post('/items', verifyToken, (req, res) => {
  const { id, name, description } = req.body;
  if (!id || !name || !description) {
    return res.status(400).send({ message: 'Please provide id, name, and description for the item.' });
  }

  items[id] = { name, description, userId: req.userId };
  res.status(201).send({ message: 'Item created successfully', item: items[id] });
});

// Get item route (protected)
app.get('/items/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const item = items[id];

  if (!item) {
    return res.status(404).send({ message: 'Item not found' });
  }

  if (item.userId !== req.userId) {
    return res.status(403).send({ message: 'You do not have access to this item' });
  }

  res.status(200).send({ item });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
