const express = require('express');
const cors = require('cors');
const path = require('path')
const { connectProducer } = require('../kafka/producer');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

connectProducer();

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}/`);
});
