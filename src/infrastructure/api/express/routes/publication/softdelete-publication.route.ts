import express from 'express';
import {softDeletePublicationController} from '../../../controllers/publication.controller'
import { checkAction } from '../../../../../middlewares/auth.middleware';

const router = express.Router();
router.delete('/publication',checkAction('softDelete','softDeleteOwn') ,softDeletePublicationController);
export default router