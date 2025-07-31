const express = require('express');
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}/`);
});
