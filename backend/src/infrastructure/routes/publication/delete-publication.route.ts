import express from 'express'
import { deletePublicationController } from '../../controllers/publication.controller'
import { checkAction } from '../../../middlewares/auth.middleware';
const router = express.Router();


router.delete('/delete-publication',checkAction('eliminatePublication'),deletePublicationController);
export default router