/*o borrado
schemas:{
    User:{
      type:'object',
      properties:{
        id:{
          type:'number',
          description:'Autoincrement id '
        },
        username: {
          type: 'string',
        description: 'name of the user'
        },
        email:{
          type: 'string',
          description: 'email of the user'
        },
        password:{
          type: 'string',
          description: 'Password of the user'
        }, 
        role:{
          type: 'string',
          description: 'Role in blog, could chosse between "Admin" (using an admin_Key) or "simpleUser"'
        },
        banned:{
          type: 'boolean',
          description:'Determines if user is banned (true) sets "false" as default'
        },
      },
      required: ['username','email','password'],
    },
    Publication:{
      type:'object',
      properties:{
        id:{
          type: 'Integer',
          description: 'Autoincrement id'
        },
        title:{
          type: 'string',
          description:'Title of the post'
        },
        content:{
          type: 'string',
          description: 'Content of the post'
        },
        authorId:{
          type: 'Integer',
          description:'The id of the autor'
        },
        author:{
          $ref:'#/components/schemas/User'
        },
        createdAt:{
          type:'string',
          format: 'date-time',
          description: 'creation date of the publication'
        },
        updatedAt:{
          type:'string',
          format:'date-time',
          description:'Last update date of the publication'
        },
        deleted:{
          type:'bolean',
          description: 'Determines if the publication is deleted'
        },
        favorites:{
          type:'array',
          items:{
            $ref:'#/components/schemas/Favorite'
          },
          description:'List of favorites related to the publication'
        },
      },
      required:['title','content', 'authorId'],
    },
    Favorite:{
      type:'object',
      properties:{
        id:{
          type: 'integer',
          description: 'Autoincrement id of favorite',
        },
        userId:{
          type:'integer',
          description:'The id of the user who favorited the publication'
        },
        publicationId:{
          type:'integer',
          description:'the id of the favorite publication '
        },
        createdAt:{
          type: 'string',
          format: 'date-time',
          description: 'date when the favorire was created'
        },
        user:{
          $ref: '#/components/schemas/User'
        },
        publication:{
          $ref:'#/components/schemas/Publication'
        },
      },
      requred:['userId','publicationId'],
    },




import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const PORT = process.env.PORT || 3000;

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
        BearerAuth: {
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
    tags: [
      { name: 'Users', description: 'User endpoints' },
      { name: 'Publications', description: 'Publications endpoints' },
      { name: 'Favorites', description: 'Favorite endpoints' },
    ],
  },
  apis: ['./src/infrastructure/routes/publication/*.ts', './src/infrastructure/routes/user/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};



*/