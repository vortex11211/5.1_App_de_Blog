import express from 'express';
import { postPublicationController } from '../../../publication.controller';
 const router= express.Router();
 router.post('/publication',postPublicationController);
 export default router;