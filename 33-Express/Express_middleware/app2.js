const express = require('express');
const app = express();

// Simple authentication middleware for POST requests
const authMiddleware = (req, res, next) => {
  const isAuthenticated = false; // Replace with your actual authentication logic

  if (isAuthenticated) {
    next(); // If authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).send('Unauthorized');
  }
};

// app.use(authMiddleware);

app.get('/data',(req,res) => {
    res.send('Hello World')
})

// Define a POST route
app.post('/data', authMiddleware, (req, res) => {
  res.send('Data received');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});