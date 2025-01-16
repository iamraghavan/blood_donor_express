const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Import profile routes
require('dotenv').config();

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Use API routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes); // Use profile routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
