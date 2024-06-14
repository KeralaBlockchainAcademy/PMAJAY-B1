const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

let id =0;

// Middleware for validating user input
const validateUserInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  next();
};

// Middleware for processing registration
const processRegistration = (req, res) => {
  const { email, password } = req.body;
  id++;
  const user = { id: id, email, password };
  res.status(201).json(user);
};


app.post('/register', validateUserInput, processRegistration);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
