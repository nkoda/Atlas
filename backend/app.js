const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const app = express();
const publicRoutes = require('./routes/public'); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//handle incoming json data
app.use(express.json()) 

//API Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//API pubic routes
app.use('/api', publicRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1> 404: Page not found!</h1>')
})

app.listen(8080);

