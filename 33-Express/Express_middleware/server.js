const express = require('express')

const app = express()

const router = express.Router()

const loged = (req,res,next) => {
    console.log("Successfully logged in");
    next()
}

// app.use(loged)

router.get('/1')

app.get('/', loged, (req,res) => {
    res.send('Hello World')
})

app.get('/hi', (req,res) => {
    res.send("From route 2")
})

app.get('/users/kba/students/1', (req,res) => {
    res.send('Hello World')
})

app.use('/users/kba/students', router)

app.listen(3000)