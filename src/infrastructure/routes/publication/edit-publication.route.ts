import express from 'express';
import { editPublicationController } from '../../controllers/publication.controller'
import { checkAction } from '../../../middlewares/auth.middleware';
const router= express.Router();

router.put('/publication',checkAction('edit','editOwn'),editPublicationController);
export default router;