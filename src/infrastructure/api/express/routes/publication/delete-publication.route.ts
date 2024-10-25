import express from 'express'
import { deletePublicationController } from '../../../controllers/publication.controller'
const router = express.Router();
router.delete('/delete-publication',deletePublicationController);
export default router