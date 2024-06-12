const express = require('express')

const app = express()

const loged = (req,res,next) => {
    console.log("Successfully logged in");
    next()
}


const log = (req, res, next) => {
    console.log("I am not an application level router")
    next()
}

app.use(loged);

app.use(log);

app.get('/', (req,res) => {
    res.send('Hello World')
})



app.get('/hi', (req,res) => {
    res.send("From route 2")
})

app.listen(3000)