const express = require('express');

const login = express.Router();

const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

login.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: 'Invalid data!' });
  }
  return res.status(200).json({ token: generateToken() });
});

module.exports = { login };
