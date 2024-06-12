const express = require('express');

const app = express();
const port = 3000;

// Use the express.urlencoded middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve a simple HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit-form" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email } = req.body;
  res.send(`Form submitted! Name: ${name}, Email: ${email}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
