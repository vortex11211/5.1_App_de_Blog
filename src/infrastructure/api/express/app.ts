import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authMiddleware as authenticationMiddleware } from '../../../middlewares/authentication.middleware';

import registerUserRoute from './routes/user/register-user.route'
import loginUserRoute from './routes/user/login-user.route'
import listUsersRoute from './routes/user/list-users.route'

import postPublicationRoute from './routes/publication/post-publication.route'
import favoritePublicationRoute from './routes/publication/favorite-publication.route'
import editPublicationRoute from './routes/publication/edit-publication.route'
import softDeletePublicationRoute from './routes/publication/softdelete-publication.route'
import deletePublicationRoute from './routes/publication/delete-publication.route'
class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());


        // Incluir tus propias cabeceras
        this.app.use((req, res, next) => {
            res.setHeader('X-Powered-By', 'Your-Own-Value');
            res.setHeader('X-Another-Custom-Header', 'Another-Value');
            next();
        });

        // Middleware global de logging
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });

        // Aquí puedes agregar middleware de autenticación y autorización si es necesario
    }

    private initializeRoutes() {
        this.app.use('/api/users', registerUserRoute);
        this.app.use('/api/users', loginUserRoute);


        this.app.use('api/users', authenticationMiddleware, listUsersRoute);

        this.app.use('/api/publications', postPublicationRoute);
        this.app.use('/api/publications', editPublicationRoute);
        this.app.use('/api/publications', softDeletePublicationRoute);
        this.app.use('/api/publications', favoritePublicationRoute);
        this.app.use('/api/publications', deletePublicationRoute);

    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

export default App;

