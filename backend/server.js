const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const orderRoutes = require('./routes/order');
app.use('/api/order', orderRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Boom Boom Pyrotech Backend API is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
