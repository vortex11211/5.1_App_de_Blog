import express from 'express'
import { getPublicationByIdController } from '../../controllers/publication.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();


router.get("/:id", checkAction('getpublication'), getPublicationByIdController);

export default router;
