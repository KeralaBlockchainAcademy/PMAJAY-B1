const express = require ('express');
const session = require ('express-session')

const app = express();

const pageroute = require('./src/routes/pageroutes')

const loginroute = require('./src/routes/loginroutes')

app.use(session({
    secret: '1',
    resave: false,
    saveUninitialized: false
}))

app.use('/', pageroute, loginroute);

app.listen(3000, () => {
    console.log("The server is starting at port 3000")
})