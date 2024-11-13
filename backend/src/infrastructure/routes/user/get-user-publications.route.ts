import express from'express';
import { getUserPublicationsController } from '../../controllers/getpublications.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

router.get('/posts', checkAction('view','viewOnw'), getUserPublicationsController);



export default router;
