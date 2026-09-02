require('dotenv').config();

const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.get('/api/test', async (req, res) => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    res.json({ status: 'success', message: 'Connected to MongoDB!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});