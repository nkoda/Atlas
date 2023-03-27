const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const publicRoutes = require('./routes/public'); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//API pubic routes
app.use('/api', publicRoutes);

//handle incoming json data
app.use(bodyParser.json()) 

app.use((req, res, next) => {
    res.status(404).send('<h1> 404: Page not found.</h1>')
})

app.listen(3000);

