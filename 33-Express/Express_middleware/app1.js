const express = require('express');
const app = express();

// Simple logging middleware
const log = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Use the middleware for all routes and HTTP methods
app.use(log);

// Define a route
app.get('/custom_url', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});