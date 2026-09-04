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

app.post('/api/reservations', async (req, res) => {
  try {
    const { name, email, phone, partySize, date, time, message } = req.body;

    if (!name || !email || !phone || !partySize || !date || !time) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const size = parseInt(partySize, 10);
    if (isNaN(size) || size < 1 || size > 20) {
      return res.status(400).json({ error: 'Party size must be between 1 and 20.' });
    }

    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(reservationDate.getTime()) || reservationDate < today) {
      return res.status(400).json({ error: 'Please choose a valid future date.' });
    }

    await client.connect();
    const db = client.db('himalayan_kitchen');
    const collection = db.collection('reservations');

    const result = await collection.insertOne({
      name,
      email,
      phone,
      partySize: size,
      date,
      time,
      message: message || '',
      createdAt: new Date()
    });

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

app.get('/api/reservations', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('himalayan_kitchen');
    const reservations = await db.collection('reservations')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});