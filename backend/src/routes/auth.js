const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { sendLoginLog } = require('../../kafka/producer');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await sendLoginLog({
      timestamp: new Date().toISOString(),
      user: username,
      action: 'login',
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
