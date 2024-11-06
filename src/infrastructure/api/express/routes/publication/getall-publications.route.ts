import express from 'express';
import { getAllPublicationsController } from '../../../controllers/getpublications.controller';
import { checkAction } from '../../../../../middlewares/auth.middleware';

const router = express.Router();

router.get('/posts', checkAction('view'), getAllPublicationsController);

export default router;
