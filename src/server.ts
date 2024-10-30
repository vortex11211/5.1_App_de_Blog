import dotenv from 'dotenv';
dotenv.config();

import App from './infrastructure/api/express/app';

const app = new App();
const PORT= Number(process.env.PORT) || 3000;

app.listen(PORT);