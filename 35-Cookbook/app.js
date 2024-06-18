const express = require ('express');

const app = express();

const pageroute = require('./src/routes/pageroutes')

app.use('/', pageroute);

app.listen(3000, () => {
    console.log("The server is starting at port 3000")
})