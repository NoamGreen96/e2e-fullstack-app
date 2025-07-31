const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectProducer, sendLoginLog } = require('../kafka/producer');
const { runConsumer } = require('../kafka/consumer');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);

const run = async () => {
  try {
    await connectProducer();
    await runConsumer();

    await sendLoginLog({
      username: 'admin',
      timestamp: new Date().toISOString(),
      success: true,
    });

    app.listen(PORT, () => {
      console.log(`Server running on: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Startup Error:', error);
    process.exit(1);
  }
};

run();