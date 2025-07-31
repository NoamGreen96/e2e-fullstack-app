const db = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    console.log('Connected! Users:', rows);
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection();