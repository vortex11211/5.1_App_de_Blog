import express from 'express';
import { likePublicationController } from '../../../controllers/like.controller';

const router = express.Router();

router.post('/like', likePublicationController);

export default router;
