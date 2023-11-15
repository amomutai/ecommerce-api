const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      description: "API endpoints for an ecomeerce assignment documented on swagger",
      contact: {
        name: "Amos Mutai",
        email: "amosmutai04@gmail.com",
        url: "https://github.com/amomutai/ecommerce-api"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:4000/",
        description: "Local server"
      },
      {
        url: "<your live url here>",
        description: "Live server"
      },
    ]
  },
  // looks for configuration in specified directories
  apis: [
    './src/api/Auth/*.js',
    './src/api/Product/*.js',
],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
module.exports =  swaggerDocs