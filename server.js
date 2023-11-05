const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccount.json'); // Update with your file path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Define a route to create new users in Firestore
app.post('/api/createUser', async (req, res) => {
  try {
    const { username, email } = req.body;

    // Access Firestore
    const db = admin.firestore();

    // Add a new user to Firestore
    const userRef = await db.collection('users').add({
      username,
      email,
    });

    return res.status(201).json({ message: 'User created successfully', id: userRef.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
