const express = require('express');

const path = require('path');

const loginroute = express.Router();

let users= {};

loginroute.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/static', 'signup.html'))
})

loginroute.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    if(users[username]){
        res.send("User already exists. Click login")
    }else{
        users[username]= {email: email, password: password, favourites: []}
        res.redirect('/home');
    }
})

loginroute.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/static', 'login.html'))
})