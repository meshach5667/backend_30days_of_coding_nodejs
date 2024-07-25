const admin = require('firebase-admin');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ecae8c5db0e1fb2f1d4d9ea4e478e9462c3d9a3bf2b1eab8e5f857d91e9ab8e4';

const register = async (req, res) => {
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
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_FIREBASE_API_KEY`, {
      email,
      password,
      returnSecureToken: true,
    });

    const token = jwt.sign({ uid: response.data.localId }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({
      idToken: response.data.idToken,
      refreshToken: response.data.refreshToken,
      jwtToken: token,
    });
  } catch (error) {
    res.status(400).send({ error: error.response.data.error.message });
  }
};

module.exports = { register, login };
