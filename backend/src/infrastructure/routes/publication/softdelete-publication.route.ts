import express from 'express';
import {softDeletePublicationController} from '../../controllers/publication.controller'
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/publications/publication:
 *   delete:
 *     summary: Soft delete a publication
 *     tags: [Publications]
 *     security:
 *       - Token: []
 *     parameters:
 *       - in: query
 *         name: publicationId
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the publication to be soft deleted
 *     responses:
 *       200:
 *         description: Publication soft deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/publication',checkAction('softDelete','softDeleteOwn') ,softDeletePublicationController);
export default router