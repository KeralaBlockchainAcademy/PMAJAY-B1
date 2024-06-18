const express = require('express');

const path = require('path')

const pageroute = express.Router()

const auth =  require('../middleware/auth')

pageroute.use(express.static(path.join(__dirname, '../../public')))

pageroute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/static', 'index.html'));
})

pageroute.get('/home', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/static', 'home.html'));
})

pageroute.get('/favourites', auth,  (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/static', 'favourites.html'));
})

module.exports = pageroute;