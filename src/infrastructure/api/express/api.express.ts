import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerUserRoute from '../controllers/express/routes/user/register-user.route'; // Asegúrate de que la ruta esté bien importada
import postPublicationRoute from '../controllers/express/routes/publication/post-publication.route'
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
        // Puedes agregar otras rutas aquí
        this.app.use('/api/publications',postPublicationRoute)
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

export default App;

