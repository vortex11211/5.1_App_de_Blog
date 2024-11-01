import express from 'express';
import { listUsersController } from '../../../controllers/user.controller';

const router = express.Router();
router.get('/list', checkAction('viewAllUsers'), listUsersController);

export default router;


