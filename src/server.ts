import App from './infrastructure/api/express/api.express';

const app = new App();
const PORT= Number(process.env.PORT) || 3000;

app.listen(PORT);