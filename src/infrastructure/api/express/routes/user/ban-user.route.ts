import express from 'express';
import { banUserController } from '../../../controllers/user.controller';
import { checkAction } from '../../../../../middlewares/auth.middleware';

const router= express.Router();
router.delete('/ban', checkAction('banUser'),banUserController);

export default router
