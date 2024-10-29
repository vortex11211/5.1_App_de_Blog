import express from 'express';
import { listUsersController } from '../../../controllers/user.controller';
import { checkAction } from '../../../../../middlewares/auth.middleware';

const router = express.Router();

router.get('/list', checkAction('viewAllUsers'), listUsersController);

export default router;



