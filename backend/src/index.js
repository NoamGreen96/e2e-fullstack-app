const express = require('express');
const cors = require('cors');
const path = require('path')
const { connectProducer, sendLoginLog } = require('../kafka/producer');
const { runConsumer } = require('../kafka/consumer');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

const run = async () => {
  await connectProducer();
  await runConsumer();

  await sendLoginLog({
    username: 'admin',
    timestamp: new Date().toISOString(),
    success: true,
  });
};

run();
app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}/`);
});
