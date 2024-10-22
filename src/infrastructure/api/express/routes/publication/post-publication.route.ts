import express from 'express';
import { postPublicationController } from '../../../controllers/publication.controller';
 const router= express.Router();
 router.post('/publication',postPublicationController);
 export default router;