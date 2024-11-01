import express from 'express';
import { listUsersController } from '../../../controllers/user.controller';

const router = express.Router();
//vamos a quitar el checkAction router.get('/list', checkAction('viewAllUsers'), listUsersController);

router.get('/list', listUsersController);

export default router;


