const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path:'../.env'});
const authRoutes = require('./routes/auth');
const uploadRoute = require('./routes/upload');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoute);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const dashboardRoute = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoute); // Use the dashboard route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
