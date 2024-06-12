const express = require('express');
const app = express();
 
app.set('title', 'Learning Express');


 
app.get('/', (req, res) => {
    res.send(app.get('title'));
})
 
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });