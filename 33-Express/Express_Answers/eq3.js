const express = require('express');
const app = express();

app.use(express.json());


app.post('/submit-review', (req, res) => {
  const { title, review } = req.body;
  if (!title || !review) {
    return res.status(400).send('Title and review are required');
  }
  res.send(`Review for "${title}" submitted successfully: ${review}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
