const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser()); // Replace with a secure secret

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'john_doe', { maxAge: 60000, httpOnly: true });
    res.send('Cookie set successfully!');
});

app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Welcome, ${username}!`);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
