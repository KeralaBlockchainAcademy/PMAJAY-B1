const express = require('express');

const path = require('path');

const apiroute= express.Router();

require('dotenv').config()

apiroute.use(express.static(path.join(__dirname,'../../public')));

const API_KEY= process.env.API_KEY

apiroute.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/static', 'results.html'))
})

apiroute.post('/search/result', async(req, res) => {
    const query= req.body.query;
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=6&addRecipeInformation=true`);
        const data = await response.json();
        const recipes = data.results;
        res.json(recipes);
    }catch(error){
        console.error(error);
        res.status(500).send("An error occured while fetching recipies");
    }
})

apiroute.get('/search/result/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/static', 'showrecipe.html'))
})

module.exports = apiroute