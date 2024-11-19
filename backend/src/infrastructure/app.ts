import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerConfig from './routes/swagger'
import registerUserRoute from './routes/user/register-user.route'
import loginUserRoute from './routes/user/login-user.route'
import listUsersRoute from './routes/user/list-users.route'
import banUserRoute from './routes/user/ban-user.route'
import updateUserRoute from './routes/user/update-user.route'
import getUserPublicationsRoute from './routes/user/get-user-publications.route'

import getAllPublicationsRoute from './routes/publication/getall-publications.route'
import { authMiddleware } from '../middlewares/authentication.middleware';

import postPublicationRoute from './routes/publication/post-publication.route'
import favoritePublicationRoute from './routes/publication/favorite-publication.route'
import editPublicationRoute from './routes/publication/edit-publication.route'
import softDeletePublicationRoute from './routes/publication/softdelete-publication.route'
import deletePublicationRoute from './routes/publication/delete-publication.route'
import getPublicationByIdRoute from './routes/publication/get-publication-by-id.route'


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


        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });

    }

    private initializeRoutes() {
        this.app.use('/api/users', registerUserRoute);
        this.app.use('/api/users', loginUserRoute);
        swaggerConfig(this.app)
        this.app.use(authMiddleware)

        this.app.use('/api/users', listUsersRoute);
        this.app.use('/api/users', banUserRoute);
        this.app.use('/api/users', updateUserRoute);
        this.app.use('/api/users', getUserPublicationsRoute);
        this.app.use('/api/publications', getAllPublicationsRoute);
        this.app.use('/api/publications', postPublicationRoute);
        this.app.use('/api/publications', editPublicationRoute);
        this.app.use('/api/publications', softDeletePublicationRoute);
        this.app.use('/api/publications', favoritePublicationRoute);
        this.app.use('/api/publications', deletePublicationRoute);
        this.app.use('/api/publications', getPublicationByIdRoute);
        ;
    }

    
    
    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log('documenst')
        });
    }


}

export default App;


