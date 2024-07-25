const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const firebaseConfig = {
  apiKey: "AIzaSyDR5GBfx6gs4lnrnmefZ2jI8JFyZQnBicE",
  authDomain: "backendnodejs-a6813.firebaseapp.com",
  projectId: "backendnodejs-a6813",
  storageBucket: "backendnodejs-a6813.appspot.com",
  messagingSenderId: "837533147666",
  appId: "1:837533147666:web:d39fe34c09f449f1b52ecb",
  measurementId: "G-XVCMZW15CR"
};

const serviceAccount = require('/home/meshach/backend_30days_of_coding_nodejs/day18/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());

// Your registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password
    });

    res.status(201).send({
      message: 'User registered successfully',
      uid: userRecord.uid
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
