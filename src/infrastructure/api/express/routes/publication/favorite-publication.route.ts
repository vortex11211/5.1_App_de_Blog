import express from 'express';
import { favoritePublicationController } from '../../../controllers/favorite.controller';

const router = express.Router();

router.post('/like', favoritePublicationController);

export default router;
