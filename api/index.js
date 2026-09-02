const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

module.exports = app;