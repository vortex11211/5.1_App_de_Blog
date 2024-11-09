import express from 'express';
import { favoritePublicationController } from '../../controllers/favorite.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

router.post('/like',checkAction('like'), favoritePublicationController);

export default router;
