require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

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

app.get('/api/menu', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('himalayan_kitchen');
    const items = await db.collection('menuItems').find({}).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;