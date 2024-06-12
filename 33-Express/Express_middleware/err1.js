const express = require('express');
const app = express();

// Error handling middleware function
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error stack trace for debugging purposes

  // Set the HTTP status code based on the error
  const status = err.status || 500;

  // Send the error response
  res.status(status).json({
    error: {
      message: err.message,
      status,
    },
  });
  next();
};

app.use(errorHandlerMiddleware);

// Route handler
app.get('/users', (req, res, next) => {
  // Simulate an error
  const error = new Error('Something went wrong');
  error.status = 400; // Set a custom status code (optional)
  next(error); // Pass the error to the error handling middleware
});

// Use the error handling middleware for all routes


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});