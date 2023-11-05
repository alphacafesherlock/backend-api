const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// API endpoint to create a new user
app.post('/api/createUser', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.json(userRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API endpoint to get user details by UID
app.get('/api/getUser/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const userRecord = await admin.auth().getUser(uid);
    res.json(userRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
