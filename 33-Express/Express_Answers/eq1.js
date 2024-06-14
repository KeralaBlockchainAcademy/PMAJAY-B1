const express = require('express');
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/products', (req, res) => {
  res.send('List of products');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
