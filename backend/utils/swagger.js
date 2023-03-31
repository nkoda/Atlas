const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMB Product Catalog API',
      version: '1.0.0',
      description: 'API documentation for RESTful endpoints in the IMB Product Catalog project',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/public.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
