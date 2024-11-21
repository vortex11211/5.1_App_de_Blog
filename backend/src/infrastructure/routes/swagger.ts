import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const PORT= process.env.PORT || 3000

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sprint 5.1 App de Blog',
      version: '1.0.0',
      description: 'API for my application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        Token: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    tags:[
      {
        name:'Users', 
        description: 'User endpoints',
      },
      {
        name:'Publications',
        description:'Publications endpoints',
      },
      {
        name:'Admin Only',
        description:'Admin only enpoints'
      },
    ],
  },
  apis: ['./src/infrastructure/routes/publication/*.ts', './src/infrastructure/routes/user/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
