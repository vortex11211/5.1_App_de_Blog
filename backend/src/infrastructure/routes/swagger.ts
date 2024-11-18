import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API for my application',
    },
    servers: [
      {
        url: 'http://localhost:3300',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/infrastructure/routes/publication/*.ts','./src/infrastructure/routes/user/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
