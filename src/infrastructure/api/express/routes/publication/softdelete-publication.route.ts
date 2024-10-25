import express from 'express';
import {softDeletePublicationController} from '../../../controllers/publication.controller'

const router = express.Router();
router.delete('/publication', softDeletePublicationController);
export default router