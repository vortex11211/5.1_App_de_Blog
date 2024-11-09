import express from 'express';
import { postPublicationController } from '../../controllers/publication.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

 const router= express.Router();
 router.post('/publication',checkAction('create'),postPublicationController);
 export default router;