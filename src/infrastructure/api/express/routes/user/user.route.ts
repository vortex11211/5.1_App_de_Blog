import express from 'express';
import {/* banUserController,*/ listUsersController } from '../../../controllers/user.controller';
import { checkAction } from '../../../../../middlewares/auth.middleware'

const router = express.Router();

/*router.post('/ban', checkAction('banUser'), banUserController);*/
router.get('/list', checkAction('viewAllUsers'), listUsersController);

export default router;
