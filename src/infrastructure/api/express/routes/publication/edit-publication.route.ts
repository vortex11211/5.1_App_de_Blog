import express from 'express';
import { editPublicationController } from '../../../controllers/publication.controller'
const router= express.Router();

router.patch('/publication',editPublicationController);
export default router;